package creation

import (
	"fmt"
	"io/fs"
	"os"
)

func InitIncorpoDirectories(projectName string, path string, subfolder bool) (bool, error) {
	
	hasPath := len(path) > 0

	if hasPath {
		fmt.Printf("Path Detected: %s...\n", path)
	}

	if !subfolder {
		fmt.Println("Creating without subfolder...")
	}

	if subfolder {
		var rootErr error

		//Create root project directory
		if hasPath{
			rootErr = os.Mkdir(path + string(os.PathSeparator) + projectName, fs.ModeDir)
		}else{
			rootErr = os.Mkdir(projectName, fs.ModeDir)
		}


		if rootErr != nil {
			fmt.Println("Project already exists in specified path")
			return false, rootErr
		}	
	}

	//Create src directory

	srcErr := createProjectDirectory(hasPath, path, subfolder, projectName, "src")

	if srcErr != nil {
		fmt.Println("Project already exists in specified path")
		return false, srcErr
	}

	//Create src directory
	assetsErr := createProjectDirectory(hasPath, path, subfolder, projectName, "assets")

	if assetsErr != nil {
		fmt.Println("Project already exists in specified path")
		return false, srcErr
	}

	//Create scripts folder inside src directory
	scriptErr := createProjectDirectory(hasPath, path, subfolder, projectName, "src"+string(os.PathSeparator)+"scripts")

	if scriptErr != nil {
		fmt.Println("Project already exists in specified path")
		return false, scriptErr
	}

	//Create styles folder inside src directory
	styleErr := createProjectDirectory(hasPath, path, subfolder, projectName, "src"+string(os.PathSeparator)+"styles")

	if styleErr != nil {
		fmt.Println("Project already exists in specified path")
		return false, styleErr
	}

	//Create pages folder inside src directory
	pageErr := createProjectDirectory(hasPath, path, subfolder, projectName, "src"+string(os.PathSeparator)+"pages")

	if pageErr != nil {
		fmt.Println("Project already exists in specified path")
		return false, pageErr
	}

	//Create components folder inside src directory
	compErr := createProjectDirectory(hasPath, path, subfolder, projectName, "src"+string(os.PathSeparator)+"components")

	if compErr != nil {
		fmt.Println("Project already exists in specified path")
		return false, compErr
	}

	return true, nil
}

func createProjectDirectory(hasPath bool, path string, subfolder bool, projectName string, newDirPath string) error{
	var err error

	if hasPath {
		err = os.Mkdir(path + "/" +InculdeProjectName(subfolder, newDirPath, projectName), fs.ModeDir)
	}else {
		err = os.Mkdir(InculdeProjectName(subfolder, newDirPath, projectName), fs.ModeDir)
	}

	if err != nil {
		return err
	}

	return nil
}

func InculdeProjectName(include bool, path string, projectName string) (string) {
	if include {
		return projectName + string(os.PathSeparator) + path
	}

	return path
}