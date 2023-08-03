const { keccak256 } = require('ethereum-cryptography/keccak');

function getAddress(publicKey) {
  // Step 1: Slice off the first byte of the public key
  const slicedPublicKey = publicKey.slice(1);

  // Step 2: Calculate the keccak hash of the sliced public key
  const keccakHash = keccak256(slicedPublicKey);

  // Step 3: Take the last 20 bytes of the keccak hash and return it
  const address = keccakHash.slice(-20);

  return address;
}

module.exports = getAddress;
