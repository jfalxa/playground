var Ingredient = require( '../models/Ingredient.model' );


var onComplete = function ( reply )
{
    return function ( err, data )
    {
        if ( err )
        {
            reply( err );
        }
        else
        {
            reply( data );
        }
    }
};


var ingredientRoutes =
[
    {
        path    : '/ingredients',
        method  : 'GET',
        handler : function ( request, reply )
        {
            Ingredient.findAll()
                .complete( onComplete( reply ) );
        }
    },

    {
        path    : '/ingredients',
        method  : 'POST',
        handler : function ( request, reply )
        {
            var ingredientData = request.payload;

            Ingredient.create( ingredientData )
                .complete( onComplete( reply ) );
        }
    },

    {
        path    : '/ingredients/{id}',
        method  : 'GET',
        handler : function ( request, reply )
        {
            var ingredientId = request.params.id;

            Ingredient.find( { where: { id: ingredientId } } )
                .complete( onComplete( reply ) );
        }
    },

    {
        path    : '/ingredients/{id}',
        method  : 'PUT',
        handler : function ( request, reply )
        {
            var ingredientId   = request.params.id;
            var ingredientData = request.payload;

            Ingredient.update( ingredientData, { where: { id: ingredientId } } )
                .complete( onComplete( reply ) );
        }
    },
];


module.exports = ingredientRoutes;
