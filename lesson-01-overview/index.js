const { sum, multiply } = require("./math.js")

const a = 3, b = 5;
const result = sum(a, b);

console.log(`Sum between ${a} + ${b} = ${result}`);
console.log(`Multiply between ${a} * ${b} = ${multiply(a, b)}`);

// Module nodeJS
const fs = require('fs') // fs -- filesystem
const content = 'Toi la lap trinh vien';

fs.writeFile('test.txt', content, (err) => {
    if (err) {
        console.error('Something error!');
    }
    // file written successfully
})

fs.readFile('test.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Something error!');
        return;
    }
    console.log(data);
})

// Express

const express = require('express'); // import by commonJS
const app = express();
const port = 3001;

app.get('/', (req, res) => {

    res.send('This is the first web service.')
})

app.listen(port, () => {
    console.log(`My server is running at PORT: ${port}`);
})