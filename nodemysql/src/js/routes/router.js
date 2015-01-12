var initRoutes = function ( server, routes )
{
    for ( var i=0, len=routes.length; i<len; i++ )
    {
        server.route( routes[i] );
    }
};


module.exports = initRoutes;
