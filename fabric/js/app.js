$( window ).load( function ()
{
    var canvas = new fabric.Canvas('fabric-test');

    var rect = new fabric.Rect(
    {
        left: 100,
        top: 100,
        fill: 'red',
        width: 100,
        height: 100
    });

    var rect = new fabric.Rect(
    {
        left: 100,
        top: 100,
        fill: 'red',
        width: 100,
        height: 100
    });


    rect.setControlsVisibility({
        mt : false, // middle top disable
        mb : false, // midle bottom
        ml : false, // middle left
        mr : false, // I think you get it
        tl : false,
        tr : false,
        bl : false,
        br : false,
    });

    canvas.add(rect);

    canvas.renderAll();

    var $select = $( '.top-select' );
    $( '.fabric-test' ).click( function( e )
    {
        $select.offset(
        {
            top: e.pageY,
            left : e.pageX
        } );
    } );

} );
