const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(data){
        this.hash = null;
        this.height = 0;
        this.body = Buffer.from(JSON.stringify(data).toString('hex'));
        this.time = 0;
        this.previousBlockHash = '';
    }
}

moduke.exports = Block;