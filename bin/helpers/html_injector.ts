import fs from 'fs/promises';
import { join } from 'path';
import { parse } from 'node-html-parser';

import { colorString } from './output_helper.js';
import { readFile, createDirectory, createFile } from './file_helpers.js';

const pagesDirectory: string = join('.', 'src', 'pages');
const componentsDirectory: string = join('.', 'src', 'components');

export async function injectHTML(path?: string){

    const startTime = new Date();

    console.log(colorString('Loading components...\n', 'bright_green'));
    const loadedComponents = formatComponents(await loadComponents(componentsDirectory));

    await setupDistDirectory('.');

    if(!path){
        console.log(colorString('Injecting into index.html...\n', 'bright_green'));
        //Inject components into index page
        const indexFile: string = await readFile('index.html', join('.', 'src'), { encoding: "utf-8"});
        
        const parsedIndex = parse(indexFile);
        
        const components = parsedIndex.getElementsByTagName('inco-comp');
        
        injectComponents(components, loadedComponents);

        await createFile('index.html', join('.', 'dist'), parsedIndex.innerHTML);

        //Inject components into all pages inside the "pages" directory
        const contents = await getPagesContents(pagesDirectory);

        contents.forEach(async (pageContent) => {
            console.log(colorString(`Injecting into ${pageContent.name}...\n`, 'bright_green'));
            const el = parse(pageContent.content);
            const components = el.getElementsByTagName('inco-comp');

            injectComponents(components, loadedComponents);

            await createFile(pageContent.name, join('.', 'dist', 'pages'), el.innerHTML);
        });

        const timeTaken = new Date().getTime() - startTime.getTime();
        console.log(colorString(`Injection completed - ${timeTaken}ms...\n`, 'bright_green'));

        return;
    }

    

}

function findComponentByID(components: any[], id?: string){
    for( const component of components ) {
        if(component.id == id){
            return component;
        }
    }

    return 'no-component-found';
}

async function loadComponents(path: string){
    const foundComponents = await fs.readdir(path, { withFileTypes: true });

    const contents: any[] = [];

    for (const component of foundComponents){
        if(component.isFile()){
            const content = await readFile(component.name, path, { encoding: 'utf-8' });
            contents.push(content);
        }
    }

    return contents;
}

function formatComponents(componentContents: any[]){
    const formattedComponents: any[] = [];

    componentContents.forEach((component) => {
        const element = parse(component);
        const mainTag = element.getElementsByTagName('incorpo')[0];
        if(mainTag){
            formattedComponents.push({ id: mainTag.getAttribute('id'), element});
        }else{
            return console.log(colorString('No component header found - Add <incorpo /> tag with "id" attribute to your component', 'bright_red'));
        }
    });

    return formattedComponents;
}

async function getPagesContents(path: string){
    const foundPages = await fs.readdir(path, { withFileTypes: true });

    const contents: any[] = [];

    for (const page of foundPages){
        if(page.isFile()){
            const content = await readFile(page.name, path, { encoding: 'utf-8' });

            contents.push({name: page.name, content});
        }
    }

    return contents;
}

function injectComponents(foundComponents: any[], loadedComponents: any[]){
    foundComponents.forEach(comp =>{
        const compID = comp.getAttribute('id');

        const foundComp = findComponentByID(loadedComponents, compID);

        const componentHTML = foundComp.element.getElementsByTagName('markup')[0];

        comp.insertAdjacentHTML('afterend', componentHTML.innerHTML);

        comp.remove();
    });
}

async function setupDistDirectory(path: string){
    await createDirectory('dist', path);
    await createDirectory(join('dist', 'assets'), path);
    await createDirectory(join('dist', 'assets', 'scripts'), path);
    await createDirectory(join('dist', 'assets', 'styles'), path);
    await createDirectory(join('dist', 'pages'), path);
}