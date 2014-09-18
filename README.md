gulp-sass-sprites
=================

Convert groups of images into spritesheets and sass map via gulp


## Usage

First, install `spritesmith` and `gulp`:

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

example (scss):
```css
@include sprite('logo');
```

if you want to extend placeholder with background-image definition instead of applying it directly, pass true as second argument:

```css
@include sprite('logo', true);
```

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

## Example SCSS result
```css

// MAPS

$sprites: (

  logo: (
    width: 124,
    height: 23,
    x: 0,
    y: 0,
    group: "basic"
  ),

  logo--client: (
    width: 96,
    height: 17,
    x: 0,
    y: -24,
    group: "basic"
  ),

  logo--x2: (
    width: 247,
    height: 45,
    x: 0,
    y: 0,
    group: "medium"
  ),

  logo--client--x2: (
    width: 192,
    height: 33,
    x: 0,
    y: -46,
    group: "medium"
  ),

);

$spriteGroups: (

  basic: (
    image: "../images/sprites.basic.png",
    width: 124,
    height: 41
  ),

  medium: (
    image: "../images/sprites.medium.png",
    width: 247,
    height: 79
  ),

);

// PLACEHOLDERS

%sprite-basic {
  background-image: url(../images/sprites.basic.png);
}

%sprite-medium {
  background-image: url(../images/sprites.medium.png);
}


// MIXINS & FUNCTIONS
@function sprite-width($name) {
  @return map-get(map-get($sprites, $name), 'width');
}

@function sprite-height($name) {
  @return map-get(map-get($sprites, $name), 'height');
}

@function sprite-group-image($name) {
  @return map-get(map-get($spriteGroups, $name), 'image');
}

@function sprite-image($name) {
  @return sprite-group-image(map-get(map-get($sprites, $name), 'group'));
}

@mixin sprite-position($name) {
  $sprite : map-get($sprites, $name);

  background-position: #{map-get($sprite, 'x')}px #{map-get($sprite, 'y')}px;
}

@mixin sprite($name, $extend : false) {
  $sprite : map-get($sprites, $name);

  @if $extend {
    @extend %sprite-#{map-get($sprite, 'group')};
  }
  @else {
    background-image: url(#{sprite-image($sprite)});
  }

  height: #{sprite-height($sprite)}px;
  width: #{sprite-width($sprite)}px;
  @include sprite-position($sprite);
}

```


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

Path to lodash tpl file, to format output styles file.

Set relative path to sprite img, which will be used in styles file.

#### options.padding
Type: `Integer`
Default: ``

Padding between images in generated sprite

Set padding in px between images in result sprite

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)