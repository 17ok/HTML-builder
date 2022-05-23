const path = require('path');
const {readdir, mkdir, copyFile, rm} = require('fs/promises');

const folderPath = path.resolve(__dirname, 'files');
const copyFolderPath = path.resolve(__dirname, 'files-copy');

async function copyFolder(pathFrom, pathTo) {
let fileNames;
    try {
   fileNames = await readdir(pathFrom, {withFileTypes: true});
    } catch (error) {
     throw error;   
    }

    await rm(pathTo, {recursive: true, force: true});
    await mkdir(pathTo, {recursive: true});

    fileNames.forEach( (fileName) => {
        const filePath = path.resolve(pathTo, fileName.name);
        const copyFilePath = path.resolve(pathFrom, fileName.name);
     // console.log(`${filePath}  -  ${copyFilePath}`);
      copyFile(copyFilePath, filePath);
})
}
copyFolder(folderPath, copyFolderPath);
