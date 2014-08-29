var canvasW = canvasH = 500;
var previewW = previewH = 100;
var spriteX, spriteY, posX, posY;

function draw()
{
	spritemap = document.getElementById('spritemap').getContext('2d');
	preview = document.getElementById('preview').getContext('2d');

	img = new Image();

	img.addEventListener('load', function()
	{
		var imgW = img.naturalWidth;
  		var imgH = img.naturalHeight;
  		spriteX = Math.ceil( (canvasW - imgW)/2 );
  		spriteY = Math.ceil( (canvasH - imgH)/2 );
		spritemap.drawImage( img, spriteX, spriteY );
		preview.drawImage( img, 0, 0 );
	});

	var startX, startY;
	var moveX, moveY;
	var endX, endY;

	$( '#spritemap' ).mousedown( function(e)
	{
		startX = e.pageX;
		startY = e.pageY;

		$( this ).on( 'mousemove', function(e)
		{
			endX = e.pageX;
			endY = e.pageY;
			console.log('mooooooooooooooove!');
		});
	});


	$( '#spritemap' ).mouseup( function(e)
	{
		$( this ).off( 'mousemove' );

		endX = e.pageX;
		endY = e.pageY;

		var pX = Math.min( startX, endX );
		var pY = Math.min( startY, endY );
		pX -= $(this).position().left + spriteX;
		pY -= $(this).position().top + spriteY;

		var pW = Math.abs( startX - endX );
		var pH = Math.abs( startY - endY );

		console.log(pX, pY);
		console.log(pW, pH);

		var cX = ( previewW - pW ) / 2;
		var cY = ( previewH - pH ) / 2;

		preview.clearRect( 0, 0, previewW, previewH );
		preview.drawImage( img, pX, pY, pW, pH, cX, cY, pW, pH );

	});

	img.src = 'img/sprite.png';
}

// posX = e.pageX - ( $(this).position().left + spriteX ),
// posY = e.pageY - ( $(this).position().top + spriteY );

// console.log( $(this).offset().left, $(this).offset().top );
// console.log( e.pageX, e.pageY );
// console.log( posX - previewW/2, posY - previewH/2);

// preview.clearRect( 0, 0, previewW, previewH );
// preview.drawImage( img, -(posX - previewW/2), -(posY - previewH/2));

