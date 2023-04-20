#!/usr/bin/env node
import yargs from 'yargs';

import { ArgAction } from './enums/ArgAction.js';

import { processArgs } from "./helpers/arg_processor.js";
import { outputHeaderFull, outputHeaderMin, colorString } from './helpers/output_helper.js';

import { createProject } from './helpers/project_creator.js';

import { injectHTML } from './helpers/html_injector.js';

const PROJECT_NAME = "Incorpo"
const VERSION = '0.0.4';

const argAction = processArgs(yargs(process.argv.slice(2)).argv);

if(argAction.action !== ArgAction.PROJECT_HELP){
    outputHeaderFull(PROJECT_NAME, VERSION);
}else{
    outputHeaderMin(PROJECT_NAME);
}

switch(argAction.action){
    case ArgAction.INIT_PROJECT:
        createProject();
        break;
    case ArgAction.COMPILE_WITH_PATH:
        console.log(colorString('Compiling project at path : ' + argAction?.data.path + '....', 'bright_green'));
        break;
    case ArgAction.COMPILE_NO_PATH:
        console.log(colorString('Starting HTML injection...\n', 'bright_green'));
        injectHTML();
        break;
    case ArgAction.INVAILD_PATH:
        console.error(colorString('Invaild creation path. Type "incorpo -h" for help.', 'red'));
        break;
    case ArgAction.PROJECT_HELP:
        //TODO: Add help screen :)
        console.error(colorString('This will be a help screen :)', 'red'));
        break;
    default:
        console.error(colorString('Invaild arguments. Type "incorpo -h" for help.', 'red'));
        break;
}