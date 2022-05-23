const path = require('path');
const {readdir, mkdir, copyFile, rm} = require('fs/promises');

const folderPath = path.resolve(__dirname, 'files');
const copyFolderPath = path.resolve(__dirname, 'files-copy');

async function copyFolder(pathOut, pathIn) {
let fileNames;
    try {
    fileNames = await readdir(pathOut, {withFileTypes: true});
    } catch (error) {
     throw error;   
    }

    await rm(pathIn, {recursive: true, force: true});
    await mkdir(pathIn, {recursive: true});

    fileNames.forEach( (fileName) => {
        const filePath = path.resolve(pathIn, fileName.name);
        const copyFilePath = path.resolve(pathOut, fileName.name);
       // console.log(`${filePath}  -  ${copyFilePath}`);
       copyFile(copyFilePath, filePath);
})
}
copyFolder(folderPath, copyFolderPath);
