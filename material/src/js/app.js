var testStore = require( './stores/testStore' );

window.testStore = testStore;

testStore.addChangeListener( function ()
{
    console.log( 'i changed.' );
});


testStore.kikoo( { id: 1, salut: 'chalutier' } );
