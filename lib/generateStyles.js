var path        = require('path'),
    fs          = require('fs'),
    _           = require('lodash'),
    json2css    = require('json2css');

module.exports = function generateStyles(styleData, styleTemplate) {
    
    'use strict';

    var format = 'custom',
        cleanCoords = [];

    _.each(styleData, function( sprite ) {

        var coordinates     = sprite.coordinates,
            properties      = sprite.properties,
            imgPath         = sprite.imgPath;

        _.each(coordinates, function( coords, file ) {

            var fullname    = path.basename(file),
            nameParts       = fullname.split('.');

            if(nameParts.length >= 2) nameParts.pop();

            var name        = nameParts.join('.');

            coords.name         = name;
            coords.source_image = file;
            coords.image        = imgPath;
            coords.total_width  = properties.width;
            coords.total_height = properties.height;
            
            cleanCoords.push(coords);
        });

    });

    // default style template
    if (!styleTemplate) styleTemplate = path.resolve(__dirname, 'scss.mustache');

    var tpl = fs.readFileSync(styleTemplate, 'utf8');
    json2css.addMustacheTemplate(format, tpl);

    return json2css(cleanCoords, { format: format, formatOpts: {} });
};
