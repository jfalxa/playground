var Recipe = require( '../models/Recipe.model.js' );


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


var RecipeRoutes =
[
    {
        path    : '/recipe',
        method  : 'GET',
        handler : function ( request, reply )
        {
            Recipe.getAll().complete( onComplete.bind( this, reply ) );
        }
    },

    {
        path    : '/recipe',
        method  : 'POST',
        handler : function ( request, reply )
        {
            var recipeData = request.payload;

            Recipe.createRecipe( recipeData ).complete( onComplete.bind( this, reply ) );
        }
    },

    {
        path    : '/recipe/{id}',
        method  : 'GET',
        handler : function ( request, reply )
        {
            var recipeId = request.params.id;

            Recipe.getRecipe( recipeId ).complete( onComplete.bind( this, reply ) );
        }
    },

    {
        path    : '/recipe/{id}',
        method  : 'PUT',
        handler : function ( request, reply )
        {
            var recipeId   = request.params.id;
            var recipeData = request.payload;

            Recipe.updateRecipe( recipeId, recipeData ).complete( onComplete.bind( this, reply ) );
        }
    },

    {
        path    : '/recipe/{id}/ingredients',
        method  : 'GET',
        handler : function ( request, reply )
        {
            var recipeId = request.params.id;

            Recipe.listIngredients( recipeId ).complete( onComplete.bind( this, reply ) );
        }
    },

    {
        path    : '/recipe/{id}/ingredients',
        method  : 'PUT',
        handler : function ( request, reply )
        {
            var recipeId       = request.params.id;
            var ingredientData = request.payload;

            Recipe.addIngredient( recipeId, ingredientData ).complete( onComplete.bind( this, reply ) );
        }
    },
];


module.exports = RecipeRoutes;
