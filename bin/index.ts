#!/usr/bin/env node
import yargs from 'yargs';

import { processArgs } from "./helpers/arg_processor.js";
import { outputHeader } from './helpers/output_helper.js';

const VERSION = '0.0.2';

const argAction = processArgs(yargs(process.argv.slice(2)).argv);

outputHeader(VERSION);