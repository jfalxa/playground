'use strict';

var React               = require('react');
var AutocompleteList    = require( './autocompletelist.react.jsx' );


var Autocomplete = React.createClass(
{
  getInitialState : function ()
  {
    return { found: [] };
  },


  onKeyUp : function ( e )
  {
    var found = this.props.findMethod( e.target.value, this.props.items );

    this.setState( { found: found } );
  },


  render : function()
  {
    return (
      <div className="autocomplete">
        <input onKeyUp={ this.onKeyUp } className="" />
        <AutocompleteList items={this.state.found}/>
      </div>
    );
  }

} );


module.exports = Autocomplete;
