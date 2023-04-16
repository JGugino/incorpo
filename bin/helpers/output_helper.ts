import chalk from "chalk";

export function outputHeader(version: string){
    const headerText = 'Incorpo HTML Injector';
    const versionText = `Version: ${version}`;
    const createdText = "Author: Gugino";
    const headerArea = 36;

    const headerSpacing = createSpacing(headerText, headerArea);
    const versionSpacing = createSpacing(versionText, headerArea);
    const createdSpacing = createSpacing(createdText, headerArea);

    console.log(chalk.redBright(createHorizontalBar('-', headerArea)));
    console.log(headerSpacing + chalk.bold.underline.whiteBright(headerText) + headerSpacing);
    console.log(versionSpacing + chalk.bold.underline.whiteBright(versionText) + versionSpacing);
    console.log(createdSpacing + chalk.bold.underline.whiteBright(createdText) + createdSpacing);
    console.log(chalk.redBright(createHorizontalBar('-', headerArea)));
}

function createHorizontalBar(character: string, length: number){
    let bar = "";
    for (let index = 0; index < length; index++) {
        bar += character;
    }

    return bar;
}

function createSpacing(value: string, area: number): string{
    const remainingArea = Math.round((area - value.length) / 2);
    let areaSpacing = "";

    for (let index = 0; index < remainingArea; index++) {
        areaSpacing += " ";
    }

    return areaSpacing;
}