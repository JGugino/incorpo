package templates

func CreateConfigTemplate(projectName string, incorpoVersion string) string {

	name := "projectName=\"" + projectName + "\"\n"
	version := "incorpoVersion=\"" + incorpoVersion + "\"\n"

	configLines := []string{
		name,
		"version=\"0.0.1\"\n",
		version,
		"[output]\n",
		"path=\"./dist\"\n",
	}

	var finalString string

	for _, l := range configLines {
		finalString += l
	}

	return finalString
}
