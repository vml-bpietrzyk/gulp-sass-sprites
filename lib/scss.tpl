<% if(images.length && groups.length){ %>
// MAPS

$sprites: (
<% _.forEach(images, function( i ) { %>
    <%- i.name %>: (
        width: <%- i.width %>,
        height: <%- i.height %>,
        x: <%- i.x * -1 %>,
        y: <%- i.y * -1 %>,
        group: "<%- i.group %>"
    ),
<% }); %>
);

$spriteGroups: (
<% _.forEach(groups, function( g ) { %>
    <%- g.name %>: (
        image: "<%- g.image %>",
        width: <%- g.width %>,
        height: <%- g.height %>
    ),
<% }); %>
);

// PLACEHOLDERS
<% _.forEach(groups, function( g ) { %>
%sprite-<%- g.name %> {
    background-image: url(<%- g.image %>);
}
<% }); %>

// MIXINS & FUNCTIONS
@function sprite-width($name) {
    @return map-get(map-get($sprites, $name), 'width');
}

@function sprite-height($name) {
    @return map-get(map-get($sprites, $name), 'height');
}

@function sprite-group-width($name) {
    $group : map-get(map-get($sprites, $name), 'group');

    @return map-get(map-get($spriteGroups, $group), 'width');
}

@function sprite-group-height($name) {
    $group : map-get(map-get($sprites, $name), 'group');

    @return map-get(map-get($spriteGroups, $group), 'height');
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

@mixin sprite-retina-position($name) {
    $sprite : map-get($sprites, $name);

    background-position: #{map-get($sprite, 'x')/2}px #{map-get($sprite, 'y')/2}px;
}

@mixin sprite($name, $extend : false) {
    $sprite : map-get($sprites, $name);

    @if $extend {
        @extend %sprite-#{map-get($sprite, 'group')};
    }
    @else {
        background-image: url(#{sprite-image($name)});
    }

    height: #{sprite-height($name)}px;
    width: #{sprite-width($name)}px;
    @include sprite-position($name);
}

@mixin sprite-retina($name, $extend : false) {
    $sprite : map-get($sprites, $name);

    @if $extend {
        @extend %sprite-#{map-get($sprite, 'group')};
    }
    @else {
        background-image: url(#{sprite-image($name)});
    }
    background-repeat: no-repeat;
    background-size: #{sprite-group-width($name)/2}px #{sprite-group-height($name)/2}px;
    height: #{sprite-height($name)/2}px;
    width: #{sprite-width($name)/2}px;
    @include sprite-retina-position($name);
}
<% } %>