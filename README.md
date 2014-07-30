gulp-sass-sprites
=================

Convert a sets of images into spritesheets and sass map via gulp


## Usage

First, install globally `spritesmith` and `gulp`:

```shell
sudo npm install spritesmith -g;
npm install gulp;
```

Then, add it to your package.json with source url (github repository)

```javascript
"devDependencies": {
  "gulp": "~3.7.0",
  "gulp-sass-sprites": "git://github.com/vml-bpietrzyk/gulp-sass-sprites.git"
}
```

Next step is adding it to your `gulpfile.js`:

```javascript
var sassSprites = require("gulp-sass-sprites");
var gulpif = require("gulp-if");

gulp.task('sprites', function () {
    return gulp.src('./img/sprites/**/*.png')
        .pipe(sassSprites({
            imgName: 'sprites.png',
            styleName: '_sprites.scss',
            imgPath: '../img/sprites.png',
        }))
        .pipe(gulpif('*.png', gulp.dest('./img/')))
        .pipe(gulpif('*.scss', gulp.dest('./scss/partials')));
});
```
Create sprites directory structure to group your output sprite files, for example:

* **/sprites**
    * **/basic**
        * **/png**
    * **/extended**
         * **/png**


and you`ll get 2 sprites: sprites.basic.png, sprites.extended.png. And 1 .scss file with sprites map.

With this structure you can improve performance by loading only required images on mobile version.

## Output scss

### sprite mixin
You can use any sprite in your sass file via sprite mixin.
This sass mixin applies 4 css properties:
`background-image`, `background-position`, `height`, `width`

### functions

#### sprite-width
returns sprite width in pixels

example (scss):
```css
margin-left: -#{sprite-width('logo--main')/2}px;
```

#### sprite-height
returns sprite height in pixels

example (scss):
```css
margin-top: -#{sprite-height('logo--main')/2}px;
```

#### sprite-position
returns position as css property `background-position`

#### sprite-image
returns image path


## API

### sassSprites(options)

#### options.imgName
Type: `String`
Default: ``

Set name for sprite img file.

#### options.styleName
Type: `String`
Default: ``

Set name for sprite styles file.

#### options.imgPath
Type: `String`
Default: ``

Set relative path to sprite img, which will be used in styles file.

#### options.styleTemplate
Type: `String`
Default: ``

Path to mustache tmpl file, to format output styles file.

Set relative path to sprite img, which will be used in styles file.


#### options.padding
Type: `Integer`
Default: ``

Padding between images in generated sprite

Set padding in px between images in result sprite

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)