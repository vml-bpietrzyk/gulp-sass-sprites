var through         = require('through'),
    async           = require('async'),
    path            = require('path'),
    File            = require('vinyl'),
    spritesmith     = require('spritesmith'),
    generateStyles  = require('./lib/generateStyles'),
    _               = require('lodash'),
    gutil           = require('gulp-util');

var PluginError = gutil.PluginError;

module.exports = function ( options ) {

    'use strict';

    var options     = options || {},
        defaults    = {
            'engine'    : 'auto',
            'algorithm' : 'binary-tree',
            'padding'   : 1
        },

        params      = _.extend({}, defaults, options),
    
        _buffer     = {},
        _style      = [],

        // add files to buffer
        bufferContents = function( file ) {
            if (file.isNull()) return;
            if (file.isStream()) return this.emit('error', new PluginError('gulp-spritesmith', 'Streaming not supported'));

            var parsedPath = file.relative.split(path.sep);

            if(!_buffer[parsedPath[0]]) _buffer[parsedPath[0]] = [];
            _buffer[parsedPath[0]].push(file.path);
        },

        process = function() {
            if (_.keys(_buffer).length === 0 || _buffer.length === 0) return this.emit('end');

            async.each(_.keys(_buffer), generateSprite.bind(this), saveStyles.bind(this));
        },

        generateSprite = function( group, cb ) {
            var config = params || {};
            config.src = _buffer[group];

            spritesmith(config, function(err, result) {
                if (err) return self.emit('error', new PluginError('gulp-spritesmith', 'Error occurred during spritesmith processing'));

                var imgPath = rename(params.imgPath, group),
                    si      = saveImages.bind(this);

                _style.push({ coordinates : result.coordinates, properties : result.properties, imgPath : imgPath });

                si(result, imgPath);
                cb();

            }.bind(this));
        },

        saveStyles = function() {
            console.log('Saving styles: '+ params.styleName);

            this.emit('data', new File({
                cwd         : './',
                base        : './',
                path        : params.styleName,
                contents    : new Buffer(generateStyles(_style, params.styleTemplate))
            }));

            this.emit('end')
        },

        saveImages = function(result, path) {
            console.log('Saving image: '+ path);

            this.emit('data', new File({
                cwd         : './',
                base        : './',
                path        : path,
                contents    : new Buffer(result.image, 'binary')
            }));
        },

        rename = function(file, group) {
            return file.replace(/\.(?=[^.]*$)/g, '.' + group + '.');
        };

    return through(bufferContents, process);

};