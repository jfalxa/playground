var db              = require( '../utils/db' );
var Sequelize       = require( 'sequelize' );


var recipeSchema =
{
    name : Sequelize.STRING
};

var Recipe = db.define( 'Recipe', recipeSchema,
{
    classMethods :
    {
        get : function ( id )
        {
            return this.find( { where: { id: id } } );
        },


        addIngredient : function ( recipeId, ingredient )
        {
            return Recipe.getRecipe( recipeId )
                .then( function ( recipe )
                {
                    return recipe.addIngredient( ingredient.id );
                } );
        },


        listIngredients : function ( recipeId )
        {
            return Recipe.getRecipe( recipeId )
                .then( function ( recipe )
                {
                    return recipe.getIngredients();
                } );
        }
    }

} );

Recipe.sync();


module.exports = Recipe;
