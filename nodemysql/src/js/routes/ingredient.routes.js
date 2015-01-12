var Ingredient = require( '../models/ingredient.model.js' );


var onComplete = function ( reply, err, data )
{
    if ( err )
    {
        reply( err );
    }
    else
    {
        reply( data );
    }
};


var ingredientRoutes =
[
    {
        path    : '/ingredient',
        method  : 'GET',
        handler : function ( request, reply )
        {
            Ingredient.getAll().complete( onComplete.bind( this, reply ) );
        }
    },

    {
        path    : '/ingredient',
        method  : 'POST',
        handler : function ( request, reply )
        {
            var ingredientData = request.payload;

            Ingredient.createIngredient( ingredientData ).complete( onComplete.bind( this, reply ) );
        }
    },

    {
        path    : '/ingredient/{id}',
        method  : 'GET',
        handler : function ( request, reply )
        {
            var ingredientId = request.params.id;

            Ingredient.getIngredient( ingredientId ).complete( onComplete.bind( this, reply ) );
        }
    },

    {
        path    : '/ingredient/{id}',
        method  : 'PUT',
        handler : function ( request, reply )
        {
            var ingredientId   = request.params.id;
            var ingredientData = request.payload;

            Ingredient.updateIngredient( ingredientId, ingredientData ).complete( onComplete.bind( this, reply ) );
        }
    },
];


module.exports = ingredientRoutes;
