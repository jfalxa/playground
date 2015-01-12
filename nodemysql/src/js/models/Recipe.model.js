var db         = require( '../utils/db' );
var Ingredient = require( './Ingredient.model' );
var Sequelize  = require( 'sequelize' );


var recipeSchema =
{
    name : Sequelize.STRING
};


var RecipeModel      = db.define( 'Recipe', recipeSchema );
var RecipeIngredient = db.define( 'RecipeIngredient' );

RecipeModel.belongsToMany( Ingredient.model, { through: RecipeIngredient } );
Ingredient.model.belongsToMany( RecipeModel, { through: RecipeIngredient } );

RecipeModel.sync();
RecipeIngredient.sync();


var Recipe =
{
    model : RecipeModel,

    getAll : function ()
    {
        return Recipe.model.findAll();
    },

    createRecipe : function ( recipeData )
    {
        return Recipe.model.create( recipeData );
    },

    getRecipe : function ( recipeId )
    {
        return Recipe.model.find( { where: { id: recipeId } } );
    },

    updateRecipe : function ( recipeId, recipeData )
    {
        return Recipe.getRecipe( recipeId )
            .then( function ( recipe )
            {
                return recipe.updateAttributes( recipeData );
            } );
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
};


module.exports = Recipe;
