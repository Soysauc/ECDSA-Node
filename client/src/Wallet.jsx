import server from './server';
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { toHex, utf8ToBytes } from 'ethereum-cryptography/utils';
import { sha256 } from 'ethereum-cryptography/sha256.js';

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  signature,
  setSignature,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    console.log(privateKey);

    const address = secp256k1.getPublicKey(sha256(utf8ToBytes(privateKey)));
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
  console.log(balance);

  return (
    <div className='container wallet'>
      <h1>Your Wallet</h1>

      <label>
        Private Key{' '}
        <input
          // placeholder='Type a signature, for example: 0x1'
          placeholder='Type a private key, for example: 0x1'
          value={privateKey}
          // value={signature}
          onChange={onChange}
        ></input>
      </label>
      <div className='balance'>Address:{address.slice(0, 10)}...</div>
      <div className='balance'>Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
