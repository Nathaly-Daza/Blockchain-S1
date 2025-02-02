// Importamos la librería crypto-j
const SHA256 = require('crypto-js/sha256');
// Importamos la función hex2ascii
const hex2ascii = require('hex2ascii');
// Definimos la clase Block
class Block{
    constructor(data){
        this.hash = null;
        this.height = 0;
        this.body = Buffer.from(JSON.stringify(data).toString('hex'));
        this.time = 0;
        this.previousBlockHash = '';
    }
//Método para validar el bloque
    validate(){
        const self = this;
        return new Promise((resolve, reject) => {
            let currentHash = self.hash;
//Se asigna null al hash del bloque actual y se calcula el hash del bloque
            self.hash = SHA256(JSON.stringify({ ...self, hash: null})).toString();
            if (currentHash !== self.hash) {
                return resolve(false);
            }
            resolve(true);
        });
    }

//Método para obtener los datos del bloque
getBlockData(){
    // Se asigna la instancia de la clase a la variable self
    const self = this;
    // Se retorna una promesa
    return new Promise((resolve, reject) => {
        let encodedData = self.body;
        let decodedData = hex2ascii(encodedData)
        let dataObject = JSON.parse(decodedData);
        //Si el bloque es el bloque génesis, se rechaza la promesa
        if (dataObject === 'Genesis Block') {
            reject(new Error('This is the Genesis Block'))
        }
//Se resuelve la promesa con los datos del bloque
        resolve(dataObject);

    });
 } 
//Método para convertir el bloque a string
  toString(){
    const { hash, height, body,time, previousBlockHash} = this;
    return `Block -
     hash: ${hash}, 
     height: ${height}, 
     body: ${body}, 
     time: ${time}, 
     previousBlockHash: ${previousBlockHash} 
     ---------------------------------------------`
  }
}
//Exportamos la clase Block
module.exports = Block;