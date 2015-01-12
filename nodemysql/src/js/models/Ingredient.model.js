var db        = require( '../utils/db' );
var Recipe    = require( './Recipe.model' );
var Sequelize = require( 'sequelize' );


var ingredientSchema =
{
    name : Sequelize.STRING
};

var IngredientModel = db.define( 'Ingredient', ingredientSchema );

IngredientModel.sync();

var Ingredient =
{
    model : IngredientModel,

    getAll : function ()
    {
        return Ingredient.model.findAll();
    },

    createIngredient : function ( ingredientData )
    {
        return Ingredient.model.create( ingredientData );
    },

    getIngredient : function ( ingredientId )
    {
        return Ingredient.model.find( { where: { id: ingredientId } } );
    },

    updateIngredient : function ( ingredientId, ingredientData )
    {
        return Ingredient.getIngredient( ingredientId )
            .then( function ( ingredient )
            {
                return ingredient.updateAttributes( ingredientData );
            } );
    }
};


module.exports = Ingredient;
