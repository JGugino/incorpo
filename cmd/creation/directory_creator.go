package creation

import (
	"fmt"
	"os"
)

func InitIncorpoDirectories(projectName string, path string, subfolder bool) (bool, error) {
	
	hasPath := len(path) > 0

	if !subfolder {
		fmt.Println("Creating without subfolder...")
	}

	if subfolder {
		var rootErr error

		//Create root project directory
		if hasPath{
			rootErr = os.Mkdir(path + string(os.PathSeparator) + projectName, 0777)
		}else{
			rootErr = os.Mkdir(projectName, 0777)
		}


		if rootErr != nil {
			fmt.Println("Project already exists in specified path")
			return false, rootErr
		}	
	}

	//Create src directory

	srcErr := createProjectDirectory(path, subfolder, projectName, "", "src")

	if srcErr != nil {
		fmt.Println("Project already exists in specified path")
		return false, srcErr
	}

	//Create src directory
	assetsErr := createProjectDirectory(path, subfolder, projectName, "", "assets")

	if assetsErr != nil {
		fmt.Println("Project already exists in specified path")
		return false, srcErr
	}

	//Create scripts folder inside src directory
	scriptErr := createProjectDirectory(path, subfolder, projectName, "src", "scripts")

	if scriptErr != nil {
		fmt.Println("Project already exists in specified path")
		return false, scriptErr
	}

	//Create styles folder inside src directory
	styleErr := createProjectDirectory(path, subfolder, projectName, "src", "styles")

	if styleErr != nil {
		fmt.Println("Project already exists in specified path")
		return false, styleErr
	}

	//Create pages folder inside src directory
	pageErr := createProjectDirectory(path, subfolder, projectName, "src", "pages")

	if pageErr != nil {
		fmt.Println("Project already exists in specified path")
		return false, pageErr
	}

	//Create components folder inside src directory
	compErr := createProjectDirectory(path, subfolder, projectName, "src", "components")

	if compErr != nil {
		fmt.Println("Project already exists in specified path")
		return false, compErr
	}

	return true, nil
}

func createProjectDirectory(currentPath string, subfolder bool, projectName string, subPath string, folderName string) error{
	hasSubPath := len(subPath) > 0

	var finalPath string

	if !subfolder {
		if hasSubPath{
			finalPath = currentPath + subPath + string(os.PathSeparator) + folderName
		}else{
			finalPath = currentPath + folderName
		}
	}else{
		if hasSubPath{
			finalPath = currentPath + projectName + string(os.PathSeparator) + subPath + string(os.PathSeparator) + folderName
		}else{
			finalPath = currentPath + projectName + string(os.PathSeparator) + folderName
		}
	}

	err := os.Mkdir(finalPath , 0777)

	if err != nil {
		return err
	}

	return nil
}