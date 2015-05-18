"use strict";

var _            = require( 'lodash' );
var assign       = require( 'object-assign' );
var constants    = require( '../../constants/constants.js' );
var EventEmitter = require( 'events' ).EventEmitter;


var store = assign( {}, EventEmitter.prototype,
{
    _items : [],


    add : function ( itemData, options )
    {
        options = options || {};

        if ( this.get( itemData.id ) )
        {
            throw new Error( 'An item with this id already exists' );
        }
        else
        {
            this._items.push( itemData );
            this.length++;
        }

        if ( !options.silent )
        {
            this.emitChange();
        }
    },


    addMany : function ( itemData, options )
    {
        options = options || {};

        var len = itemData.length;

        for ( var i=0; i<len; i++ )
        {
            this.add( itemData[i], { silent: true } );
        }

        if ( !options.silent && len > 0 )
        {
            this.emitChange();
        }
    },


    get : function ( itemId )
    {
        return _.find( this._items, { id: itemId } );
    },


    all : function ()
    {
        return this._items;
    },


    filter : function ( properties )
    {
        return _.find( this._items, properties );
    },


    update : function ( itemData, options )
    {
        options = options || {};

        var updatedValue;
        var originalValue;

        var item    = this.get( itemData.id );
        var changed = [];

        if ( item )
        {
            for ( var attr in itemData )
            {
                updatedValue  = itemData[attr];
                originalValue = item[attr];

                if ( updatedValue !== originalValue )
                {
                    changed.push( { attr: attr, old: originalValue } );
                }

                item[attr] = updatedValue;
            }

            if ( !options.silent && changed.length > 0 )
            {
                this.emitChange();
            }
        }
        else
        {
            throw new Error( 'Item does not exist' );
        }

        return changed;
    },


    updateMany : function ( itemData, options )
    {
        options = options || {};

        var item;
        var changed = {};

        for ( var i in itemData )
        {
            item             = itemData[i];
            changed[item.id] = this.update( itemData[i], { silent: true } );
        }

        if ( !options.silent && !_.isEmpty( changed ) )
        {
            this.emitChange();
        }

        return changed;
    },


    remove : function ( itemId, options )
    {
        options = options || {};

        var removedItem = _.remove( this._items, { id: itemId } );

        if ( !options.silent && removedItem.length > 0 )
        {
            this.emitChange();
        }

        // throw an error when the item does not exist ?

        return removedItem;
    },


    emitChange : function ()
    {
        this.emit( constants.CHANGE_EVENT );
    },


    addChangeListener : function ( callback )
    {
        this.on( constants.CHANGE_EVENT, callback );
    },


    removeChangeListener : function ( callback )
    {
        this.removeListener( constants.CHANGE_EVENT, callback );
    }

} );


module.exports = store;
