import { Status } from '../enums/Status.js';

export function processArgs(argv: any): {status: Status, action: string, data?: {}} {

    let commands = argv._;

    if(argv.init === true && commands.length <= 0){
        return { status: Status.OKAY, action: "init-project" };
    }

    if(argv.path){
        if(argv.path === true && typeof(argv.path) !== 'string'){
            return { status: Status.ERROR, action: "invalid-compile-path" }; 
        }

        return { status: Status.OKAY, action: "compile-path", data: { path: argv.path } };
    }

    return { status: Status.OKAY, action: "compile-no-path" };
}