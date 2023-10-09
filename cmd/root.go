/*
Copyright © 2023 Gugino gugino.inquires@gmail.com
*/
package cmd

import (
	"incorpo/cmd/creation"
	"incorpo/cmd/dist"
	"incorpo/cmd/validation"
	"os"

	"github.com/spf13/cobra"
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "incorpo",
	Short: "Incorpo is a cli complier for templating html sites",
	Long: `Incorpo is a cli complier which takes the created template elements and adds them into the specified locations within the pages`,
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func addSubCommands(){
	rootCmd.AddCommand(creation.CreateCmd)
	rootCmd.AddCommand(dist.BuildCmd)
	rootCmd.AddCommand(validation.CheckCmd)
}

func init() {
	addSubCommands()
}


