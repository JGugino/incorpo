import fs from 'fs/promises';
import { join } from 'path';
import promptSync from 'prompt-sync';
import cliSelect from 'cli-select';

import { createDirectory, createFile } from './file_helpers.js';
import { colorString, stylizeString } from './output_helper.js';

import { defaultConfig } from '../defaults/default_config.js';
import { defaultIndex } from '../defaults/default_index.js';

const prompt = promptSync();

const selectOptions = {
    values: [ 'Vanilla', 'Electron', 'Capacitor' ],
 
    defaultValue: 0,
 
    selected: '(x)',
 
    unselected: '( )',
 
    indentation: 0,
 
    cleanup: true,

    valueRenderer: (value:string, selected:boolean) =>{
        if(selected){
            return colorString(stylizeString(value, 'underline'), 'bright_red');
        }

        return colorString(value, 'bright_blue');
    }
}

export async function createProject(){
    console.log(colorString('Starting project creator... \n', 'bright_green'));
    
    const projectName = prompt(colorString(`Project Name ${colorString('(project-name)', 'gray')}: `, 'bright_blue'));
    
    if(!projectName){
        return;
    }

    console.log('');

    const selection = await cliSelect(selectOptions).then(result => result).catch(error => console.log(colorString(`Unknown selection, please try again`, 'red')));

    if(!selection){
        return
    }

    console.log('');
    console.log(colorString(`Initializing ${selection.value.toLowerCase()} project "${projectName}"... \n`, 'bright_green'));

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

        await createFile('incorpo.config.toml', rootPath, defaultConfig);

        await createFile('index.html', join(rootPath, 'src'), defaultIndex)

        const timeTaken = new Date().getTime() - startTime.getTime();

        console.log(colorString(`Project created - ${timeTaken}ms`, 'bright_green'));
    })
    .catch(error => {
        console.log(colorString('Unable to create project directories, please try again', 'red'));
    });
}