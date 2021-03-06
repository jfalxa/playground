var app		= require('http').createServer(handler);
var mime	= require( 'mime' );
var io		= require('socket.io').listen(app);
var fs		= require('fs');

app.listen( 8008 );

var uidList = [];

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

io.sockets.on( 'connection', function ( socket )
{
	var uid = uidList.length;
	uidList.push( uid );

	socket.on( 'message', function ( data )
	{
		console.log( 'Message:', data.content );
		socket.emit( 'message:sent' );

		var messageData =
		{
			user		: uid,
			date		: data.date,
			content		: data.content
		};

		socket.broadcast.emit( 'message:broadcast', messageData );
	});
});