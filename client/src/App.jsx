import Wallet from './Wallet';
import Transfer from './Transfer';
import './App.scss';
import { useState } from 'react';

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');
  const [signature, setSignature] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  return (
    <div className='app'>
      <Wallet
        // signature={signature}
        // setSignature={setSignature}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer
        setBalance={setBalance}
        address={address}
        // signature={signature}
        privateKey={privateKey}
      />
    </div>
  );
}

export default App;
