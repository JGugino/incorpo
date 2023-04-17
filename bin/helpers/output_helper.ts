import chalk from "chalk";

export function outputHeader(version: string){
    const headerText = 'Incorpo';
    const versionText = `Version: ${version}`;
    const createdText = "Author: Gugino \n";
    const headerArea = 36;

    const headerSpacing = createSpacing(headerText, headerArea);
    const versionSpacing = createSpacing(versionText, headerArea);
    const createdSpacing = createSpacing(createdText, headerArea);

    console.log(chalk.redBright(createHorizontalBar('-', headerArea)));
    console.log(headerSpacing + stylizeString(colorString(headerText, 'bright_blue'), 'underline') + headerSpacing);
    console.log(versionSpacing + stylizeString(colorString(versionText, 'bright_white'), 'bold') + versionSpacing);
    console.log(createdSpacing + stylizeString(colorString(createdText, 'bright_green'), 'bold') + createdSpacing);
    console.log(chalk.redBright(createHorizontalBar('-', headerArea)));
}

function createHorizontalBar(character: string, length: number){
    let bar = "";
    for (let index = 0; index < length; index++) {
        bar += character;
    }

    return bar + '\n';
}

export function colorString(value: string, color: string): string{
    switch(color){
        case "red":
            return chalk.red(value);
        case "green":
            return chalk.green(value);
        case "yellow":
            return chalk.yellow(value);
        case "blue":
            return chalk.blue(value);
        case "magenta":
            return chalk.magenta(value);
        case "cyan":
            return chalk.cyan(value);
        case "white":
            return chalk.white(value);
        case "gray":
            return chalk.gray(value);
        case "black":
            return chalk.black(value);
        case "bright_red":
            return chalk.redBright(value);
        case "bright_green":
            return chalk.greenBright(value);
        case "bright_yellow":
            return chalk.yellowBright(value);
        case "bright_blue":
            return chalk.blueBright(value);
        case "bright_magenta":
            return chalk.magentaBright(value);
        case "bright_cyan":
            return chalk.cyanBright(value);
        case "bright_white":
            return chalk.whiteBright(value);
        default:
            return chalk.white(value);
    }
}

export function stylizeString(value: string, style: string): string{
    switch(style){
        case "bold":
            return chalk.bold(value);
        case "dim":
            return chalk.dim(value);
        case "italic":
            return chalk.italic(value);
        case "underline":
            return chalk.underline(value);
        case "overline":
            return chalk.overline(value);
        case "inverse":
            return chalk.inverse(value);
        case "hidden":
            return chalk.hidden(value);
        case "strikethrough":
            return chalk.strikethrough(value);
        case "visible":
            return chalk.visible(value);
        default:
            return chalk.reset(value);
    }
}

function createSpacing(value: string, area: number): string{
    const remainingArea = Math.round((area - value.length) / 2);
    let areaSpacing = "";

    for (let index = 0; index < remainingArea; index++) {
        areaSpacing += " ";
    }

    return areaSpacing;
}