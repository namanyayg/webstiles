#!/usr/bin/env node

/**
 * The purpose of this script is to read in all the files
 * from the color-me-sass `colors` subdirectory, and place
 * those in a JavaScript accessible data structure, then
 * write out to a scripts/js/colors.js file for later use.
 *
 * It uses Node.js and assumes that we've previously done:
 * $ git submodule init && git submodule update
 * to pull in the latest color-me-sass files
 */
var fs = require('fs');
var path = require('path');
var filedata = '';
var colors = {};

// argv[1] will be path to this script which is in: /full/path/to/<webstiles>/scripts
// we utlize that fact to build a path to our colors dir
var colorsSource = path.join(path.dirname(process.argv[1]), '../sass/colors/colors');
var colorsDest = path.join(path.dirname(process.argv[1]), 'js/colors.json');
var colorsJSDest = path.join(path.dirname(process.argv[1]), 'js/colors.js');
readColorsDir(colorsSource, colorsDest);

function readColorsDir (sourcePath, destPath) {
    var files = fs.readdirSync(sourcePath);
    for (var i in files) {
        var currentFile = sourcePath + path.sep + files[i];
        var stats = fs.statSync(currentFile);
        if (stats.isFile()) {
            console.log(currentFile);
            var ext = getExtension(currentFile);
            var name = getFilename(currentFile, '.'+ext);
            if (ext === 'scss') {
                // For last file we know we're ready to write out our js colors file
                if (i == files.length-1) {
                    var islast = true;
                }
                readColorFile(name, currentFile, destPath, islast, colorLineHandler);
            }
        }
        else if (stats.isDirectory()) {
            readColorsDir(currentFile);
        }
    }
};


/**
 * Reads the color file line by line and parses out the color vars in to data structure
 */
function readColorFile(name, sourcePath, destPath, islast, func) {
    // Clear out our global filedata var
    filedata = '';
    var input = fs.createReadStream(sourcePath);
    var remaining = '';

    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        var last  = 0;
        // Read data line by line
        while (index > -1) {
            var line = remaining.substring(last, index);
            last = index + 1;
            func(name, line);
            index = remaining.indexOf('\n', last);
        }
        remaining = remaining.substring(last);
    });
    input.on('end', function() {
        func(name, remaining);
        var str = JSON.stringify(colors);
        // This will write out our temp JSON file at colors.json
        fs.writeFile(destPath, str, function(err) {
            if(err) {
                console.log(err);
            }
            if (islast) {
                // This will finally write out the colors.js file
                writeColorsAsJavascript(colorsDest, colorsJSDest);
            }
        });
    });
}

/**
 * Actually parses a single line for a particular Sass file and adds to our
 * colors data structure (using as key the `filename` passed in)
 */
function colorLineHandler(filename, data) {
    // console.log('File: '+filename+ '\tLine: ' + data);
    if (data.length > 0) {
        filedata += data;
    }
    if (!colors[filename]) {
        colors[filename] = {};
    }
    var key, value,
        split = data.trim().split(':');
    if (split.length > 1) {
        key = split[0];
        // split[1] should have something like:
        // "          #8db600 !default;" so we trim and split again
        value = split[1].trim().split(' ')[0];
        if (key && value) {
            colors[filename][key] = value;
        }
    }
}

/**
 * Writes out our colors.js file
 */
function writeColorsAsJavascript(jsonSrcPath, destPath) {
    // Grabs our temp colors.json file which has the structure from previously
    // reading in all the color-me-sass partials
    var json = fs.readFileSync(jsonSrcPath, "utf8");
    // Prepare and write a loadable JavaScript file that creates a _colorz namespace
    var templateStart = 'var _colorz = (function () {\nreturn ';
    var templateEnd = ';\n})();';
    var content = templateStart + json + templateEnd;
    console.log("--- Writing out Colors JavaScript ---");
    fs.writeFile(destPath, content, function(err) {
        if(err) {
            console.log("Issue creating final JavaScript file: ", err);
        } else {
            console.log("Colors JavaScript written to: ", destPath);
        }
    });
}

function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

function getFilename(filename, ext) {
    return path.basename(filename, ext);
}

