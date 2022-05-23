/*Сборка css бандла*/
//node 05-merge-styles

const path = require('path');
const {readdir} = require('fs/promises');
const fs = require('fs');


const cssCopyTo= path.join(__dirname, 'project-dist', 'bundle.css');
const cssCopyFrom = path.resolve(__dirname, 'styles');

async function copyStyles(pathTo, pathFrom) {
    let fileNames;
    try {
    fileNames = await readdir(pathFrom, {withFileTypes: true});
    } catch (error) {
     throw error;   
    } 
    const writeStream = fs.createWriteStream(pathTo, {flags: 'w'});
    fileNames.forEach( (file) => {
        const filePath = path.resolve(pathFrom, file.name);
       
      if (file.isFile() && path.parse(filePath).ext === '.css') {
            const readStream = fs.createReadStream(filePath);
            //readStream.pipe(writeStream, {end: false});
            readStream.on('data', info => writeStream.write(info + '\n'));
        }
    })
};
copyStyles(cssCopyTo, cssCopyFrom);