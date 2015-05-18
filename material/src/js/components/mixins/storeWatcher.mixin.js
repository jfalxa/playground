"use strict";

var storeWatcher =
{
    watchStore( store, callback )
    {
        this._storeCallbacks = this._storeCallbacks || [];

        store.addChangeListener( callback );

        this._storeCallbacks.push( { store: store, callback: callback } );
    },

    stopWatching()
    {
        var data;

        for ( var i=0, len=this._storeCallbacks.length; i<len; i++ )
        {
            data = this._storeCallbacks[i];
            data.store.removeChangeListener( data.callback );
        }

        this._storeCallbacks = [];
    },

    // default componentWillUnmount that removes the listeners
    componentWillUnmount()
    {
        this.stopWatching();
    }
};


module.exports = storeWatcher;
