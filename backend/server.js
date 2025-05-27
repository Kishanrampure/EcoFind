const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/submit-store', (req, res) => {
    const store = req.body;
    const data = JSON.parse(fs.readFileSync('./data/stores.json', 'utf8'));
    data.push(store);
    fs.writeFileSync('./data/stores.json', JSON.stringify(data, null, 2));
    res.status(200).send("Store added");
});

app.get('/get-stores', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data/stores.json', 'utf8'));
    res.json(data);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
