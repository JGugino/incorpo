import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { colorString } from './output_helper.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export async function createDirectory(name: string, path: string){
    fs.mkdir(join(path, name), { recursive: true }).catch(error => console.log(colorString(`Unable to create directory "${name}", please try again`, 'red')));
}

export async function createFile(name: string, path: string, data: string){
    fs.writeFile(join(path, name), data).catch(error => console.log(colorString(`Unable to create file "${name}", please try again`, 'red')));
}

export async function readFile(name: string, path: string, options: {}): Promise<string>{
    const file: string = await fs.readFile(join(path, name), options).then((result): string => { return result.toString(); }).catch(error => {console.log(colorString(`Unable to read file "${name}", please try again`, 'red')); return error;});
    
    return file;
}