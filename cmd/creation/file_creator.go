package creation

import (
	"fmt"
	"incorpo/cmd/templates"
	"os"
)

func InitIncorpoFiles(projectName string, path string, subfolder bool) (bool, error) {
	hasPath := len(path) > 0

	configTemplate := templates.CreateConfigTemplate(projectName, "0.0.1")

	var configErr error

	if hasPath{
		configErr = createProjectFile(path + string(os.PathSeparator), subfolder, projectName, "", "incorpo.config.toml", configTemplate)
	}else{
		configErr = createProjectFile("", subfolder, projectName, "", "incorpo.config.toml", configTemplate)
	}

	if configErr != nil{
		return false, configErr
	}

	var indexErr error

	if hasPath{
		indexErr = createProjectFile(path + string(os.PathSeparator), subfolder, projectName, "src", "index.html", templates.IndexTemplate)
	}else{
		indexErr = createProjectFile("", subfolder, projectName, "src", "index.html", templates.IndexTemplate)
	}

	if indexErr != nil{
		return false, indexErr
	}

	return true, nil
}



func createProjectFile(currentPath string, subfolder bool, projectName string, subPath string, fileName string, fileContents string) (error){

	var createErr error

	hasSubPath := len(subPath) > 0

	if !subfolder {
		if hasSubPath{
			createErr = CreateNewFile(currentPath + subPath + string(os.PathSeparator), fileName, fileContents)
		}else{
			createErr = CreateNewFile(currentPath, fileName, fileContents)
		}
	}else{
		if hasSubPath{
			createErr = CreateNewFile(currentPath + projectName + string(os.PathSeparator)+ subPath+ string(os.PathSeparator), fileName, fileContents)
		}else{
			createErr = CreateNewFile(currentPath + projectName + string(os.PathSeparator), fileName, fileContents)
		}
	}

	if createErr != nil{
		return createErr
	}

	return nil
}

func CreateNewFile(filePath string, fileName string, fileContents string) error{
	file, err := os.Create(filePath + fileName)

	if err != nil{
		fmt.Printf("Unable to create the file %s in path %s", fileName, filePath)
		return err
	}

	defer file.Close()

	_, writeErr := file.WriteString(fileContents)

	if writeErr != nil{
		fmt.Printf("Unable to write to the file %s in path %s", fileName, filePath)
		return writeErr
	}

	return nil
}

func ReadWholeFile(filePath string, fileName string) ([]byte, error){
	contents, err := os.ReadFile(filePath + fileName)

	if err != nil{
		fmt.Printf("Unable to find the file %s in path %s", fileName, filePath)
		return nil, err
	}

	return contents, nil
}