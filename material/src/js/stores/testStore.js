var assign     = require( 'object-assign' );
var storeMixin = require( './mixins/store.mixin' );


var testStore = assign( {}, storeMixin,
{
    kikoo: function ( data )
    {
        console.log( 'KIKOO!', data );

        this.add( data );
    }

} );


module.exports = testStore;
