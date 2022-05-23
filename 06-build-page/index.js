/*Сборка HTML страницы из компонентов и стилей*/
// node 06-build-page

const path = require('path');
const {readdir, mkdir, rm, copyFile, readFile} = require('fs/promises');
const fs = require('fs');


const folderTo= path.join(__dirname, 'project-dist');


async function buildPage(pathTo) {
  
     //Создаёт папку project-dist.
    await rm(pathTo, {recursive: true, force: true});
    await mkdir(pathTo, {recursive: true});

    //Заменяет шаблонные теги в файле template.html
    const htmlTo = path.join(__dirname, 'project-dist', 'index.html');
    const htmlFrom = path.join(__dirname, 'components');
    await copyHtml(htmlTo, htmlFrom)

    //Собирает в единый файл стили из папки styles и помещает их в файл project-dist/style.css.
    const cssTo = path.join(__dirname, 'project-dist', 'style.css');
    const cssFrom = path.join(__dirname, 'styles');
    await copyStyles(cssTo, cssFrom)
    
    //Копирует папку assets в project-dist/assets
    const assetsTo = path.join(__dirname, 'project-dist', 'assets');
    const assetsFrom = path.join(__dirname, 'assets');
    await copyFolder(assetsTo, assetsFrom);
};

//Заменяет шаблонные теги в файле template.html
async function copyHtml(pathTo, pathFrom) {
    try{

    const templatePath =  path.join(__dirname, 'template.html');
    const writeStream = fs.createWriteStream(pathTo);
    const readStream = fs.createReadStream(templatePath);
    const fileNames = await readdir(pathFrom, {withFileTypes: true});
    
    readStream.on('data', async(info) => {
            async function getData(){
                let data = info.toString();    
            for (let file of fileNames){
                const filePath = path.resolve(pathFrom, file.name);
                const component = await readFile(filePath);
                const tag = path.parse(filePath).name;
                data = data.replace(`{{${tag}}}`, `${component}`);
            }
            return data;
           }
            let newData = await getData();
             writeStream.write(newData);
            });
            }
    catch(error){
        throw error;
    }
};

//Собирает в единый файл стили из папки styles и помещает их в файл project-dist/style.css.
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
            readStream.on('data', info => writeStream.write(info + '\n'));
        }
    })
};

//Копирует папку assets в project-dist/assets
async function copyFolder(pathTo, pathFrom) {
        try {
    const fileNames = await readdir(pathFrom, {withFileTypes: true});

           for (let file of fileNames){
        if (file.isFile()) {
            const filePathTo = path.resolve(pathTo, file.name);
            const filePathFrom = path.resolve(pathFrom, file.name);
            await copyFile(filePathFrom, filePathTo);
        } else if (file.isDirectory()){
            const directoryPathTo = path.resolve(pathTo, file.name);
            const directoryPathFrom = path.resolve(pathFrom, file.name);
         await mkdir(directoryPathTo, {recursive: true});
         await copyFolder(directoryPathTo, directoryPathFrom)
        }
    }
        } catch (error) {
         throw error;   
        }
        await mkdir(pathTo, {recursive: true}); 
    }

buildPage(folderTo);