var Hapi              = require( 'hapi' );
var Sequelize         = require( 'sequelize' );
var initRoutes        = require( './routes/router' );
var ingredientRoutes  = require( './routes/ingredient.routes' );
var recipeRoutes      = require( './routes/recipe.routes' );


var server = new Hapi.Server();

server.connection( { host: 'localhost', port: 8000 } );

initRoutes( server, ingredientRoutes );
initRoutes( server, recipeRoutes );


server.start();
