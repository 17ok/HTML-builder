const process = require('process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {stdin, stdout, exit} = process;

const filePath = path.resolve(__dirname, 'newtext.txt');
const rl = readline.createInterface(stdin);
const output = fs.createWriteStream(filePath, {flags: 'w'});
stdout.write('Hello! Write your information, please! \n')

process.on('SIGINT', () => {
   stdout.write('Good-bye!');
   exit(0);
});
//process.on('exit', goodBye());


  
rl.on('line', line => {
    if (line === 'exit') {
        process.emit('SIGINT');
    }else {
        output.write(line + '\n');
    }
})
