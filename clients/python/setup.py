from setuptools import setup, find_packages
import sys

assert sys.version_info >= (3, 6, 0), "DataTorch requires Python 3.6+"

with open("README.md", "r", encoding="utf-8") as fp:
    long_description = fp.read()

requirements = []

setup(
    name="datatorch",
    version="0.4.2",
    description="A library for interacting with DataTorch",
    author="DataTorch",
    author_email="support@datatorch.io",
    url="https://github.com/datatorch/datatorch",
    packages=find_packages(),
    long_description=long_description,
    long_description_content_type="text/markdown",
    install_requires=requirements,
    python_requires=">=3.6",
    license="MIT license",
    zip_safe=False,
    include_package_data=True,
    classifiers=[
        "Development Status :: 4 - Beta",
        "Environment :: Console",
        "Framework :: Pytest",
        "Intended Audience :: Developers",
        "Natural Language :: English",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
)
