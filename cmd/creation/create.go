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
		fmt.Printf("Initializing incorpo project (%s) \n", args[0])
		InitIncorpoDirectories(args[0])
		fmt.Println("Initialization complete")
	},
}

func init() {
	
}
