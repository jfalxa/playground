var db        = require( '../utils/db' );
var Sequelize = require( 'sequelize' );


var ingredientSchema =
{
    name : Sequelize.STRING
};

var Ingredient = db.define( 'Ingredient', ingredientSchema );

Ingredient.sync();


module.exports = Ingredient;
