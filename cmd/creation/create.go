/*
Copyright © 2023 Gugino gugino.inquires@gmail.com
*/
package creation

import (
	"fmt"

	"github.com/spf13/cobra"
)

// createCmd represents the create command
var CreateCmd = &cobra.Command{
	Use:   "create",
	Short: "Creates a new Incorpo project",
	Long: `Creates a new Incorpo project inside a directory using the specified name`,
	Args: cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Printf("Creating incorpo project (%s)... \n", args[0])

		path, _ := cmd.Flags().GetString("path")
		subfolder, _ := cmd.Flags().GetBool("subfolder")

		fmt.Println("Creating project directories...")
		dirCompleted, _ := InitIncorpoDirectories(args[0], path, subfolder)

		fmt.Println("Creating project init files...")
		filesCompleted, _ := InitIncorpoFiles(args[0], path, subfolder)

		if dirCompleted && filesCompleted{
			fmt.Println("Project creation complete")
		}else{
			fmt.Println("Project creation failed")
		}
	},
}

func init() {
	CreateCmd.PersistentFlags().StringP("path", "p", "", "Where to create the incorpo project (current working directory if omitted)")
	CreateCmd.PersistentFlags().BoolP("subfolder", "s", true, "Create project inside a folder or current directory")
}
