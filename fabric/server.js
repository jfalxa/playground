var app		= require('http').createServer(handler);
var mime	= require( 'mime' );
var fs		= require('fs');

app.listen( 8080 );

function handler ( request, response )
{
    var file = request.url === '/' ? '/index.html' : request.url;

    fs.readFile( __dirname + file, function ( error, data )
    {
        if ( error )
        {
            response.writeHead( 500 );
            return response.end( error + 'Error loading ' + file );
        }

        var mimeType = mime.lookup( file );

        response.writeHead( 200, { "Content-Type": mimeType } );
        response.end( data );
    });
}
