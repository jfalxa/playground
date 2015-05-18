var db         = require( '../utils/db' );
var Sequelize  = require( 'sequelize' );
var Recipe     = require( './Recipe.model' );
var Ingredient = require( './Ingredient.model' );


recipeIngredientSchema =
{
    quantity : Sequelize.Number,
    unit     : Sequelize.String,
}

var RecipeIngredient = db.define( 'RecipeIngredient', recipeIngredientSchema );

Recipe.belongsToMany( Ingredient, through: RecipeIngredient } );
Ingredient.belongsToMany( Recipe, through: RecipeIngredient } );

RecipeIngredient.sync();


module.exports = RecipeIngredient;
