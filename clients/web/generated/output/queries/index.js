const fs = require('fs');
const path = require('path');

module.exports.hello = fs.readFileSync(path.join(__dirname, 'hello.gql'), 'utf8');
module.exports.project = fs.readFileSync(path.join(__dirname, 'project.gql'), 'utf8');
module.exports.projectOwner = fs.readFileSync(path.join(__dirname, 'projectOwner.gql'), 'utf8');
