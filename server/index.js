const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const recoverKey = require('./scripts/recoverKey');
const getAddress = require('./scripts/getAddress');
const { toHex } = require('ethereum-cryptography/utils');

app.use(cors());
app.use(express.json());

const balances = {
  '0354304b4708097fd2bea80c2b9df9f4a1418bc088e67da2f650af9e4546b6b141': 100,
  '02e70625fe7fcf7140999c92e4701cd3bef9f2e32444a8bed4602e8c41c67f0ca4': 50,
  '028d94d84b7c82fd4bda1253203bf1181031cf4613fad30204f22184a5ae990667': 75,
};

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', async (req, res) => {
  const { sender, recipient, amount, signature } = req.body;

  const publicKey = await recoverKey(
    JSON.stringify({ sender, recipient, amount }),
    signature.signature,
    signature.recoveryBit
  );
  const recoveredAddress = toHex(getAddress(publicKey));

  if (recoveredAddress !== sender) {
    res.status(400).send({ message: 'Invalid signature!' });
    return;
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: 'Not enough funds!' });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
