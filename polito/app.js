$( window ).load( function ()
{
	var ratio = 0.525;

	var $container		= $( '.container' );
	var $userMessage	= $( '.message' );
	var $ratio			= $( '.ratio' );
	var $politoMessage	= $( '.polito-message' );
	var $focusButton	= $( '.focuser' );

	$politoMessage.css( 'font-size', computeAppropriateFontSize( $politoMessage.text() ) );

	$userMessage.keyup( function ( e )
	{
		var message		= $userMessage.val();
		var newSize		= computeAppropriateFontSize( message );

		$politoMessage.css( 'font-size', newSize );
		$politoMessage.html( message );
	} );

	function computeAppropriateFontSize ( str )
	{
		var length = str.trim().length;

		var containerWidth	= $container.width();
		// var fontSize		= parseInt( $politoMessage.css( 'font-size' ) );
		fontSize = containerWidth / (length * ratio);

		return fontSize;
	}

	$ratio.change( function ()
	{
		ratio = parseFloat( $ratio.val() );
		var newSize = computeAppropriateFontSize( $userMessage.val().length );
		$politoMessage.css( 'font-size', newSize );
	} );


	$focusButton.click( function ( e )
	{
		console.log( 'LOL' );
		$userMessage.focus();
	} );

} );