/*Вывод информации о файлаx хранящихся в папке*/
//node 03-files-in-folder

const process = require('process');
const path = require('path');
const {readdir, stat} = require('fs');

const folderPath = path.resolve(__dirname, 'secret-folder');

readdir(folderPath, {withFileTypes: true}, (error, fileNames) => {
    if (error)  throw error;
    fileNames.forEach( (fileName) => {
            if (fileName.isFile()) {
                const filePath = path.resolve(folderPath, fileName.name);
                const name = path.parse(filePath).name;
                const ext = path.parse(filePath).ext;
                stat(filePath, (error, stats) => {
                    if (error) throw error;
                    const size = stats.size/1024;
                    console.log(`${name} - ${ext.slice(1)} - ${size}kb`);
                })
            }
        })
    }
    
)