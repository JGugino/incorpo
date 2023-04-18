import fs from 'fs/promises';
import { join } from 'path';
import promptSync from 'prompt-sync';

import { createDirectory, createFile } from './file_helpers.js';
import { colorString } from './output_helper.js';

import { defaultConfig } from '../defaults/default_config.js';
import { defaultIndex } from '../defaults/default_index.js';

const prompt = promptSync();

export async function createProject(){
    console.log(colorString('Starting project creator... \n', 'bright_green'));
    
    const projectName = prompt(colorString(`Project Name ${colorString('(project-name)', 'gray')}: `, 'bright_blue'));
    
    if(!projectName){
        return;
    }

    console.log('');
    console.log(colorString(`Initializing project ${projectName}... \n`, 'bright_green'));

    const rootPath = join('.', projectName);

    const startTime = new Date();

    fs.mkdir(rootPath)
    .then(async result => {

        //Create src directories
        console.log(colorString(`Creating "src" directories... \n`, 'bright_green'));

        await createDirectory('src', rootPath);
        await createDirectory(join('src', 'pages'), rootPath);
        await createDirectory(join('src', 'components'), rootPath);
        await createDirectory(join('src', 'assets'), rootPath);
        await createDirectory(join('src', 'assets', 'scripts'), rootPath);
        await createDirectory(join('src', 'assets', 'styles'), rootPath);


        //Create config file
        console.log(colorString(`Creating configuration... \n`, 'bright_green'));

        createFile('incorpo.config.toml', rootPath, defaultConfig);

        createFile('index.html', join(rootPath, 'src'), defaultIndex)

        const timeTaken = new Date().getTime() - startTime.getTime();

        console.log(colorString(`Project created - ${timeTaken}ms`, 'bright_green'));
    })
    .catch(error => {
        console.log(colorString('Unable to create project directories, please try again', 'red'));
    });
}

    //Create dist directories
    // await createDirectory('dist', rootPath);
    // await createDirectory(join('dist', 'assets'), rootPath);
    // await createDirectory(join('dist', 'assets', 'scripts'), rootPath);
    // await createDirectory(join('dist', 'assets', 'styles'), rootPath);
    // await createDirectory(join('dist', 'pages'), rootPath);
    // await createDirectory(join('dist', 'components'), rootPath);
