var arango = require( 'arangojs' );


var db = arango.Connection( 'localhost:8529' );

db.graph.list().done( function( res )
{
  // console.log("graph: %j", res);

} );


db.graph.create( 'neuGraf' ).then( function ()
{
	consle.log( 'graph created !' );
}, function ( err ) { console.log( 'lol no.', err ) } );