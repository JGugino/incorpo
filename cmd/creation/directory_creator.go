package creation

import (
	"io/fs"
	"os"
)

func InitIncorpoDirectories(projectName string) {
	//Create root project directory
	rootErr := os.Mkdir(projectName, fs.ModeDir)
	if rootErr != nil {
		panic(rootErr)
	}

	//Create src directory
	srcErr := os.Mkdir(projectName+"/src", fs.ModeDir)
	if srcErr != nil {
		panic(srcErr)
	}

	//Create scripts folder inside src directory
	scriptErr := os.Mkdir(projectName+"/src/scripts", fs.ModeDir)
	if scriptErr != nil {
		panic(scriptErr)
	}

	//Create styles folder inside src directory
	styleErr := os.Mkdir(projectName+"/src/styles", fs.ModeDir)
	if styleErr != nil {
		panic(styleErr)
	}

	//Create pages folder inside src directory
	pageErr := os.Mkdir(projectName+"/src/pages", fs.ModeDir)
	if pageErr != nil {
		panic(pageErr)
	}

	//Create components folder inside src directory
	compErr := os.Mkdir(projectName+"/src/components", fs.ModeDir)
	if compErr != nil {
		panic(compErr)
	}
}