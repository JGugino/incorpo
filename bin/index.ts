#!/usr/bin/env node
import yargs from 'yargs';

import { ArgAction } from './enums/ArgAction.js';

import { processArgs } from "./helpers/arg_processor.js";
import { outputHeader, colorString } from './helpers/output_helper.js';

import { createProject } from './helpers/project_creator.js';

const VERSION = '0.0.2';

const argAction = processArgs(yargs(process.argv.slice(2)).argv);

outputHeader(VERSION);

switch(argAction.action){
    case ArgAction.INIT_PROJECT:
        createProject();
        break;
    case ArgAction.COMPILE_WITH_PATH:
        console.log(colorString('Compiling project at path : ' + argAction?.data.path + '....', 'bright_green'));
        break;
    case ArgAction.COMPILE_NO_PATH:
        console.log(colorString('Compiling project...', 'bright_green'));
        break;
    case ArgAction.INVAILD_PATH:
        console.error(colorString('Invaild creation path. Type "incorpo -h" for help.', 'red'));
        break;
    default:
        console.error(colorString('Invaild arguments. Type "incorpo -h" for help.', 'red'));
        break;
}