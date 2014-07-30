<% if(images.length && groups.length){ %>
/* MAPS */

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

/* PLACEHOLDERS */
<% _.forEach(groups, function( g ) { %>
%sprite-<%- g.name %> {
    background-image: url(<%- g.image %>);
}
<% }); %>

/* MIXINS & FUNCTIONS */

@mixin sprite($name) {
    $sprite : map-get($sprites, $name);

    @extend %sprite-#{map-get($sprite, 'group')};
    background-position: #{map-get($sprite, 'x')}px #{map-get($sprite, 'y')}px;
    height: #{map-get($sprite, 'height')}px;
    width: #{map-get($sprite, 'width')}px;
}

@mixin sprite-position($name) {
    $sprite : map-get($sprites, $name);

    background-position: #{map-get($sprite, 'x')}px #{map-get($sprite, 'y')}px;
}

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
<% } %>