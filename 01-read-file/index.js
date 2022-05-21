const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, 'text.txt');
const {stdout} = process;
const input = fs.createReadStream(filePath);

input.on('error', error => console.log('Error', error.message));
input.on('open', () => input.pipe(stdout));
