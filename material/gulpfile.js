"use strict";

var gulp       = require( 'gulp' );
var browserify = require( 'browserify' );
var reactify   = require( 'reactify' );
var rename     = require( 'gulp-rename' );
var source     = require( 'vinyl-source-stream' );


gulp.task( 'compile', function ()
{
    var b = browserify()
        .transform( reactify )
        .add( './src/js/app.js' );

    return b.bundle()
        .pipe( source( 'app.js' ) )
        .pipe( rename( 'test.js' ) )
        .pipe( gulp.dest( './dist' ) );
} );


// Default Task
gulp.task( 'default', ['compile'] );
