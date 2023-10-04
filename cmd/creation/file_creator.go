package creation

import (
	"fmt"
	"incorpo/cmd/templates"
	"os"
)

func InitIncorpoFiles(projectName string, path string, subfolder bool) (bool, error) {
	hasPath := len(path) > 0

	configTemplate := templates.CreateConfigTemplate(projectName, "0.0.1")

	configErr := createProjectFile(hasPath, path, subfolder, projectName, "", ".", "/incorpo.config.toml", configTemplate)

	if configErr != nil{
		return false, configErr
	}

	indexErr := createProjectFile(hasPath, path, subfolder, projectName, "src", "", "/index.html", templates.IndexTemplate)

	if indexErr != nil{
		return false, indexErr
	}

	return true, nil
}

func createProjectFile(hasPath bool, path string, subfolder bool, projectName string, primaryRoute string, subRoute string, fileName string, fileContents string) (error){

	if len(subRoute) <= 0 {
		subRoute = primaryRoute
	}

	var createPath string

	if hasPath{
		createPath = path + string(os.PathSeparator) + InculdeProjectName(subfolder, primaryRoute, projectName)
	}else{
		createPath = InculdeProjectName(subfolder, subRoute + string(os.PathSeparator), projectName) + string(os.PathSeparator)
	}

	err := CreateNewFile(createPath, fileName, fileContents)

	if err != nil{
		return err
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