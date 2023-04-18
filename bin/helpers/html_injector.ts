import fs from 'fs/promises';
import { join } from 'path';
import { parse } from 'node-html-parser';

import { colorString } from './output_helper.js';

const pagesDirectory = join('.', 'src', 'pages');
const componentsDirectory = join('.', 'src', 'components');

export async function injectHTML(path?: string){

    const loadedComponents = formatComponents(await loadComponents(componentsDirectory));

    if(!path){
        const contents = await getPagesContents(pagesDirectory);

        contents.forEach((pageContent) => {
            const el = parse(pageContent);
            const components = el.getElementsByTagName('inco-comp');

            components.forEach(comp =>{
                const compID = comp.getAttribute('id');
                
                const foundComp = findComponentByID(loadedComponents, compID);

                const componentHTML = foundComp.element.getElementsByTagName('markup')[0];

                comp.innerHTML = componentHTML.innerHTML;

                //Finish compiling of components to pages, abstract this section to it's own function.
            });
        });

        const indexFile: string = await fs.readFile(join('.', 'src', 'index.html'), {encoding: "utf-8"})
        .then((result): string => { return result.toString(); }).catch(error => {console.log(error); return "error";});
        
        const parsedIndex = parse(indexFile);
        
        const incComponent = parsedIndex.getElementsByTagName('inco-comp');

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
            const content = await fs.readFile(join(path, component.name), { encoding: 'utf-8' })
            .then((result) => { return result.toString(); }).catch(error => { console.log(error); return "error";} )

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
            return console.log(colorString('No component header found', 'bright_red'));
        }
    });

    return formattedComponents;
}

async function getPagesContents(path: string){
    const foundPages = await fs.readdir(path, { withFileTypes: true });

    const contents: any[] = [];

    for (const page of foundPages){
        if(page.isFile()){
            const content = await fs.readFile(join(path, page.name), { encoding: 'utf-8' })
            .then((result) => { return result.toString(); }).catch(error => { console.log(error); return "error";} )

            contents.push(content);
        }
    }

    return contents;
}