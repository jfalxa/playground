var Recipe = require( '../models/Recipe.model.js' );


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


var RecipeRoutes =
[
    {
        path    : '/recipes',
        method  : 'GET',
        handler : function ( request, reply )
        {
            Recipe.findAll()
                .complete( onComplete( reply ) );
        }
    },

    {
        path    : '/recipes',
        method  : 'POST',
        handler : function ( request, reply )
        {
            var recipeData = request.payload;

            Recipe.create( recipeData )
                .complete( onComplete( reply ) );
        }
    },

    {
        path    : '/recipes/{id}',
        method  : 'GET',
        handler : function ( request, reply )
        {
            var recipeId = request.params.id;

            Recipe.get( recipeId )
                .complete( onComplete( reply ) );
        }
    },

    {
        path    : '/recipes/{id}',
        method  : 'PUT',
        handler : function ( request, reply )
        {
            var recipeId   = request.params.id;
            var recipeData = request.payload;

            Recipe.update( recipeData, { where: { id: recipeId } } )
                .complete( onComplete( reply ) );
        }
    },

    {
        path    : '/recipes/{id}/ingredients',
        method  : 'GET',
        handler : function ( request, reply )
        {
            var recipeId = request.params.id;

            Recipe.listIngredients( recipeId )
                .complete( onComplete( reply ) );
        }
    },

    {
        path    : '/recipes/{id}/ingredients',
        method  : 'PUT',
        handler : function ( request, reply )
        {
            var recipeId       = request.params.id;
            var ingredientData = request.payload;

            Recipe.addIngredient( recipeId, ingredientData )
                .complete( onComplete( reply ) );
        }
    },
];


module.exports = RecipeRoutes;
