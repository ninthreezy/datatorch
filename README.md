<p align="center">
    <img src="https://raw.githubusercontent.com/datatorch/documentation/master/docs/.vuepress/public/circle.png" width="350" />
</p>

<h1 align="center">
  DataTorch
</h1>
<h4 align="center">Web-based tool for datasets at any scale.</h4>

**Table of Contents**

- [Requirements](#requirements)
- [Layout](#layout)
- [License](#license)

## Requirements

- go 1.16+
- python
  - pyenv
- nodejs
  - nvm
- docker
- PostgreSQL

These can be installed however you'd like but we do have a docker-compose for
running external services.

Internally we use Ubuntu 20.04 or later. Other OS may work but are officially
unsupported. (If building on Linux you should install python-dev,
build-essential, and libpq-dev in addition to the above).

## Layout

In addition to the other top-level packages, there are a few special directories
that contain specific types of packages:

* **clients** contains packages that provide client packages to the various
  Stellar services.
* **exp** contains experimental packages.  Use at your own risk.
* **deployments** contains tools require for deployments. 
* **services** contains packages that compile to applications that are
  long-running processes (such as API servers).
* **tools** contains packages and utils for building and managing.

## License

TBD