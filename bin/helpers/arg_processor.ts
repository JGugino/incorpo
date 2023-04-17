import { Status } from '../enums/Status.js';
import { ArgAction } from '../enums/ArgAction.js';

export function processArgs(argv: any): {status: Status, action: ArgAction, data?: any} {

    let commands = argv._;

    if(argv.init === true && commands.length <= 0){
        return { status: Status.OKAY, action: ArgAction.INIT_PROJECT };
    }

    if(argv.path){
        if(argv.path === true && typeof(argv.path) !== 'string'){
            return { status: Status.ERROR, action: ArgAction.INVAILD_PATH }; 
        }

        return { status: Status.OKAY, action: ArgAction.COMPILE_WITH_PATH, data: { path: argv.path } };
    }

    return { status: Status.OKAY, action: ArgAction.COMPILE_NO_PATH };
}