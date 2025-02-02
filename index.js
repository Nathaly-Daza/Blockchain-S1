
//Se importan las clases necesarias
const Blockchain = require('./src/blockchain');
const Block = require('./src/block');
//Método para ejecutar el código
async function run(){
    const blockchain = await new Blockchain();
    //Se crean tres bloques
    const block1 = new Block({data: "Block 01"});
    const block2 = new Block({data: "Block 02"});
    const block3 = new Block({data: "Block 03"});
//Se añaden los bloques a la cadena
    await blockchain.addBlock(block1);
    await blockchain.addBlock(block2);
    await blockchain.addBlock(block3);
//Se imprime la cadena
    blockchain.print()
}
//Se ejecuta el código
run();