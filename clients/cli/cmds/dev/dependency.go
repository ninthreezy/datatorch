package dev

import "github.com/Masterminds/semver"

// Dependency is an environment program require to develop DataTorch
type Dependency struct {
	Name              string
	VersionContratins string
	URL               string
	OS                []string
	// Install is an optional function that attempts to install a the dependency
	Install    func() error
	GetVersion func() (*semver.Version, error)
}
