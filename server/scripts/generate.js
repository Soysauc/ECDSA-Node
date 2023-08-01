const secp = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils');
const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey);
const { keccak256 } = require('ethereum-cryptography/keccak');

console.log(toHex(privateKey));
console.log(toHex(publicKey));
