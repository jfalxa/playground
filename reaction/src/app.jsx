'use strict';

var React           = require('react');
var Autocomplete    = require('./autocomplete.react.jsx');
var people          = require( '../samples/people.json' );


var find = function ( lookFor, items )
{
  var item;
  var found = [];

  lookFor = lookFor.toLowerCase();

  if ( lookFor.length )
  {
      for ( var i in items )
      {
        item = items[i];

        if ( item.toLowerCase().indexOf( lookFor ) > -1 )
        {
          found.push( item );
        }
      }
  }

  return found;
};


React.render(
    <Autocomplete items={ people } findMethod={ find } />,
    document.getElementById( 'container' )
);
