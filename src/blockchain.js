// Exporta la clase Block
const Block = require('./block');
//Importamos la librería crypto-jD
const SHA256 = require('crypto-js/sha256');
//Definimos la clase Blockchain
class Blockchain {
    constructor(){
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }
//Método para inicializar la cadena
    async initializeChain() {
        //Si la altura de la cadena es -1, se añade un bloque génesis
        if (this.height === -1) {
            const block = new Block({ data: "Genesis Block"});
            await this.addBlock(block);
        }
    }
    //Añade un bloque a la cadena
    addBlock(block) {
        let self = this;
        return new Promise(async(resolve, reject) => {
           block.height = self.chain.length;
           block.time = new Date().getTime().toString();
            //Si la longitud de la cadena es mayor a 0, se asigna el hash del bloque anterior al bloque actual
           if (self.chain.length > 0){
            block.previousBlockHash = self.chain[self.chain.length - 1].hash;
           }
           //Llama a la función validateChain para verificar si la cadena es válida
           let errors = await self.validateChain();
           //Si hay errores, se rechaza la promesa
           if (errors.length > 0){
            reject(new Error("The chain is not valid: ", errors));

           }
           //Se calcula el hash del bloque y se añade a la cadena
           block.hash = SHA256(JSON.stringify(block)).toString();
           self.chain.push(block);
           resolve(block);
        });
    }
    //Obtiene el bloque en la posición indicada
    validateChain() {
        let self = this;
        const errors = [];
    //Se recorre la cadena y se valida cada bloque
        return new Promise (async (resolve, reject) => {
            self.chain.map(async (block)=>{
                //Se llama al método validate del bloque
                try {
                    let isValid = await block.validate();
                    if(!isValid) {
                        errors.push(new Error('The block ${block.height} is not valid'));
                    }
                }catch (err) {
                    errors.push(err)
                }
            });
        //Se resuelve la promesa con los errores encontrados
            resolve(errors);
        });
    }
//Obtiene el bloque en la posición indicada
    print(){
        //Se recorre la cadena y se imprime cada bloque
        let self = this;
        for (let block of self.chain){
            console.log(block.toString());
        }
    }

}
//Exportamos la clase Blockchain
module.exports = Blockchain;