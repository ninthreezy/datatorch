package dev

import (
	"github.com/MakeNowJust/heredoc/v2"
	"github.com/spf13/cobra"
)

// NewCmdDev shows dev commands
func NewCmdDev() *cobra.Command {
	cmd := &cobra.Command{
		Use: "auth",
		Short: "Tooling for setting up development",
		Long: heredoc.Docf(`
			Util commands for helping with DataTorch development.
		`),
	}
	


	return cmd
}