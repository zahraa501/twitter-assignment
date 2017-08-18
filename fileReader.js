var fs = require('fs');
exports.fileReader = function(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', function(err, data) {
            resolve(data)
            reject("Error occured while reading file.")
        });
    });
};