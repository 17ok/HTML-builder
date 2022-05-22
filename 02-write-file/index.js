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
  
rl.on('line', line => {
    if (line === 'exit') {
        process.emit('SIGINT');
    }else {
        output.write(line + '\n');
    }
})

//В Git Bash для Windows версий 2.35.1-2.35.4 присутствует баг,
// при котором некорректно обрабатывается событие при нажатии сочетания клавиш Ctrl+C. 
//В связи с этим во второй задаче может не показываться прощальное сообщение при нажатии данного сочетания клавиш.
// Обновите Git Bash или попробуйте запускать скрипт в другом терминале
