var path        = require('path'),
    fs          = require('fs'),
    _           = require('lodash');

module.exports = function generateStyles(styleData, styleTemplate) {
    
    'use strict';

    var format      = 'custom',
        groups      = [],
        cleanCoords = [];

    _.each(styleData, function( sprite ) {

        var coordinates     = sprite.coordinates,
            properties      = sprite.properties,
            group           = sprite.group,
            imgPath         = sprite.imgPath;

        groups.push({
            name    : group,
            image   : imgPath,
            width   : properties.width,
            height  : properties.height
        });

        _.each(coordinates, function( coords, file ) {

            var fullname    = path.basename(file),
            nameParts       = fullname.split('.');

            if(nameParts.length >= 2) nameParts.pop();

            var name        = nameParts.join('.');

            coords.name         = name;
            coords.source_image = file;
            coords.image        = imgPath;
            coords.group        = group;
            
            cleanCoords.push(coords);
        });

    });

    // default style template
    if (!styleTemplate) styleTemplate = path.resolve(__dirname, 'scss.tpl');

    var tplFile = fs.readFileSync(styleTemplate, 'utf8'),
        tpl     = _.template( tplFile );
    
    return tpl( { groups : groups, images : cleanCoords } );

    return "";
};
