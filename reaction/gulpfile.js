'use strict';

var gulp        = require( 'gulp' );
var source      = require('vinyl-source-stream');
var rename      = require( 'gulp-rename' );
var browserify  = require( 'browserify' );
var reactify    = require( 'reactify' );


gulp.task( 'reactify', function ()
{
    var b = browserify();
    b.transform( reactify );
    b.add( './src/app.jsx' );

    return b.bundle()
        .pipe( source( 'app.jsx' ) )
        .pipe( rename( 'reaction.js' ) )
        .pipe( gulp.dest( './dist' ) );
} );


// Default Task
gulp.task( 'default', ['reactify'] );
