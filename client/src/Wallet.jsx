import server from './server';
import { utf8ToBytes } from 'ethereum-cryptography/utils';
import { secp256k1 } from 'ethereum-cryptography/secp256k1.js';

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className='container wallet'>
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input
          placeholder='Type an address, for example: 0x1'
          value={address}
          onChange={onChange}
        ></input>
      </label>
      <div className='balance'>Address:{address.slice(0, 10)}...</div>
      <div className='balance'>Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
