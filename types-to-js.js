// Browserify doesn't support fs.readFile so we use this script to convert *.types files
// to *.files.js and `require` them instead.
var path = require('path');
var fs = require('fs');

function typesToJs(file) {
  var map = {},
      content = fs.readFileSync(file, 'ascii'),
      lines = content.split(/[\r\n]+/);

  lines.forEach(function(line) {
  // Clean up whitespace/comments, and split into fields
  var fields = line.replace(/\s*#.*|^\s*|\s*$/g, '').split(/\s+/);
  map[fields.shift()] = fields;
  });
  fs.writeFileSync(file + '.js', ';module.exports = ' + JSON.stringify(map, null, 4) + ';', 'utf8');
}

['types/mime.types', 'types/node.types'].forEach(function (types) {
  typesToJs(path.join(__dirname, types));
});
