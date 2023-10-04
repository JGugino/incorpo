/*
Copyright © 2023 Gugino gugino.inquires@gmail.com
*/

package dist

import (
	"fmt"

	"github.com/spf13/cobra"
)

// buildCmd represents the build command
var BuildCmd = &cobra.Command{
	Use:   "build",
	Short: "Build and output incorpo project",
	Long: `Build and output a incorpo project to the specified output directory`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("build called")
	},
}

func init() {

}
