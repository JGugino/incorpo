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

    console.log(colorString('Loading component props...\n', 'bright_green'));
    const loadedProps = loadComponentProps(loadedComponents);

    await setupDistDirectory('.');

    if(!path){
        console.log(colorString('Injecting into index.html...\n', 'bright_green'));
        //Inject components into index page
        const indexFile: string = await readFile('index.html', join('.', 'src'), { encoding: "utf-8"});
        
        const parsedIndex = parse(indexFile);
        
        const components = parsedIndex.getElementsByTagName('inco-comp');
        
        const updatedProps = findUpdatedProps(components, loadedProps);

        injectComponents(components, loadedComponents, loadedProps, updatedProps);

        await createFile('index.html', join('.', 'dist'), parsedIndex.innerHTML);

        //Inject components into all pages inside the "pages" directory
        const contents = await getPagesContents(pagesDirectory);

        contents.forEach(async (pageContent) => {
            console.log(colorString(`Injecting into ${pageContent.name}...\n`, 'bright_green'));
            const el = parse(pageContent.content);
            const components = el.getElementsByTagName('inco-comp');

            const updatedProps = findUpdatedProps(components, loadedProps);

            injectComponents(components, loadedComponents, loadedProps, updatedProps);

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

//Load the defined props from the incorpo component file
function loadComponentProps(components: any[]): any[]{
    const loadedProps:any[] = [];

    components.forEach((comp) => {
        const propsElement = comp.element.getElementsByTagName('props');

        if(!propsElement || propsElement.length <= 0){
            return [];
        }
    
        const componentProps = propsElement[0].getElementsByTagName('prop');
    
        for (let p = 0; p < componentProps.length; p++) {
            const prop = componentProps[p];
            loadedProps.push({id: prop.getAttribute('id'), value: prop.getAttribute('value')});
        }
    });

    return loadedProps;
}

function findComponentPropByID(props: any[], id?: string | null){
    for( const prop of props ) {
        if(prop.id == id){
            return prop;
        }
    }

    return 'no-prop-found';
}

//Inject the current component into the page
function injectComponents(foundComponents: any[], loadedComponents: any[], loadedProps: any[], updatedProps: any[]){
    foundComponents.forEach(comp =>{
        const compID = comp.getAttribute('id');

        const foundComp = findComponentByID(loadedComponents, compID);

        const componentHTML = foundComp.element.getElementsByTagName('markup')[0];

        injectComponentProps(componentHTML, loadedProps, updatedProps);

        comp.insertAdjacentHTML('afterend', componentHTML.innerHTML);

        comp.remove();
    });
}

//Inject the defined props into the current component
function injectComponentProps(componentHTML: HTMLElement, loadedProps: any[], updatedProps: any[]){
    const componentProps = componentHTML.querySelectorAll('prop');

    console.log("Updated Props: ", updatedProps);

    for (let p = 0; p < componentProps.length; p++) {
        const prop = componentProps[p];
        const foundProp = findComponentPropByID(loadedProps, prop.getAttribute('id'));
        const foundUpdatedProps = findUpdatedPropByID(updatedProps, prop.getAttribute('id'));

        // console.log(foundUpdatedProps);

        const propValue = foundUpdatedProps === 'no-updated-prop' ? foundProp.value : foundUpdatedProps;

        // console.log(propValue);

        prop.insertAdjacentHTML('afterend', propValue);
        
        prop.remove();
    }
}

//TODO: Fix one updated prop updating all props on components of the same id

function findUpdatedProps(components: any[], foundProps: any[]): any[]{
    const updatedProps: any[] = [];

    components.forEach(comp => {
        const props: any[] = []
        foundProps.forEach(prop =>{
            if(comp.getAttribute(prop.id)){
                props.push({id: prop.id, value: comp.getAttribute(prop.id)});
            }
        })

        updatedProps.push(props);
    });

    return updatedProps;
}

function findUpdatedPropByID(updatedProps: any[], id?: string | null){
    let foundProp = null;

    console.log("Prop By ID: ", updatedProps);

    for(let u = 0; u < updatedProps.length; u++){
        for(let p = 0; p < updatedProps[u].length; p++){
            const prop = updatedProps[u][p];

            console.log("Prop: ", prop);
        }
    }

    updatedProps.forEach(props => {
        props.forEach((prop: any) => {
            if(prop.id == id){
                foundProp = prop.value;
            }
        });
    });

    return foundProp? foundProp : 'no-updated-prop';
}

//Create the folders required for the "dist" directory
async function setupDistDirectory(path: string){
    await createDirectory('dist', path);
    await createDirectory(join('dist', 'assets'), path);
    await createDirectory(join('dist', 'assets', 'scripts'), path);
    await createDirectory(join('dist', 'assets', 'styles'), path);
    await createDirectory(join('dist', 'pages'), path);
}