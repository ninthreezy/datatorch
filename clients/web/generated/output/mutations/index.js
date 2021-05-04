const fs = require('fs');
const path = require('path');

module.exports.createProjectOwner = fs.readFileSync(path.join(__dirname, 'createProjectOwner.gql'), 'utf8');
