var fs = require('fs');
exports.fileReader = function(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', function(err, data) {
        	if(err) {
            	reject("Error occured while reading file.")
        	}
            resolve(data)
        });
    });
};