content			= $( '#content' );
spriteMap		= $( '#spritemap-canvas' );

inputSelectX	= $( '#select-x' );
inputSelectY	= $( '#select-y' );
inputSelectW	= $( '#select-w' );
inputSelectH	= $( '#select-h' );

inputSpriteMapX	= $( '#spritemap-x' );
inputSpriteMapY	= $( '#spritemap-y' );

spriteMapCanvas = document.getElementById('spritemap-canvas').getContext('2d');

var canvasW = canvasH = 500;
var spriteX, spriteY, posX, posY;
var startSpriteX, startSpriteY;
var startSelX, startSelY;
var moveX, moveY;


/*----------------------------------------------------------------------------*/
/*									SPRITE MAP 								  */
/*----------------------------------------------------------------------------*/

spriteMapImage = new Image();

spriteMapImage.addEventListener('load', function()
{
	spriteElement.w = spriteMapImage.naturalWidth;
	spriteElement.h = spriteMapImage.naturalHeight;
});

spriteMapImage.src = 'img/sprite.png';


/*----------------------------------------------------------------------------*/
/*						OBJECTS DISPLAYED IN CANVAS 						  */
/*----------------------------------------------------------------------------*/

var objectsToDraw;

selectElement =
{
	x: 0,
	y: 0,
	w: 0,
	h: 0,

	opened: true,

	draw: function()
	{
		spriteMapCanvas.fillStyle = "rgba( 0, 0, 200, 0.2 )";
		spriteMapCanvas.fillRect( this.x, this.y, this.w, this.h );
	},

	isClicked: function(cx, cy)
	{
		return ((this.x <= cx) && (cx <= this.x+this.w)) && ((this.y <= cy) && (cy <= this.y+this.h));
	},

	close: function()
	{
		this.opened = false;

		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;

		inputSelectX.val(0);
		inputSelectY.val(0);
		inputSelectW.val(0);
		inputSelectH.val(0);
	}
}

spriteElement =
{
	x: 0,
	y: 0,
	w: 0,
	h: 0,

	draw: function()
	{
		spriteMapCanvas.drawImage(spriteMapImage, this.x, this.y, this.w, this.h);
	},

	isClicked: function(cx, cy)
	{
		return ((this.x <= cx) && (cx <= this.x+this.w)) && ((this.y <= cy) && (cy <= this.y+this.h));
	}
}


/*----------------------------------------------------------------------------*/
/*						CANVAS GENERATION & DRAWING 						  */
/*----------------------------------------------------------------------------*/

$( '#canvas-update' ).click(generateCanvas);

function generateCanvas()
{
	canvasW = parseInt($( '#canvas-width' ).val());
	canvasH = parseInt($( '#canvas-height' ).val());

	spriteElement.x = Math.ceil( (canvasW - spriteElement.w)/2 );
	spriteElement.y = Math.ceil( (canvasH - spriteElement.h)/2 );

	canvas = document.getElementById('spritemap-canvas');
	canvas.width = canvasW;
	canvas.height = canvasH;

	content.width(canvasW+10);
	content.height(canvasH+10);

	objectsToDraw = [spriteElement, selectElement];

	draw();

	spriteMap.show();
}

$( '.canvasable' ).dblclick( function ()
{
	var w = $(this).width();
	var h = $(this).height();
	var canvasHTML = '<canvas width="'+w+'" height="'+h+'"></canvas>';
	$(this).append(canvasHTML);
});

function draw()
{
	spriteMapCanvas.clearRect( 0, 0, canvasW, canvasH );

	for (var i in objectsToDraw)
	{
		objectsToDraw[i].draw();
	}
}


/*----------------------------------------------------------------------------*/
/*							DRAGGING AND SELECTING 							  */
/*----------------------------------------------------------------------------*/

spriteMap.mousedown( function(eDown)
{
	startSpriteX = eDown.pageX - spriteElement.x;
	startSpriteY = eDown.pageY - spriteElement.y;

	startSelX = eDown.pageX - selectElement.x;
	startSelY = eDown.pageY - selectElement.y;

	posX = eDown.pageX - spriteMap.position().left;
	posY = eDown.pageY - spriteMap.position().top;

	selectClicked = selectElement.isClicked(posX, posY);
	spriteClicked = spriteElement.isClicked(posX, posY);

	if ( !selectClicked )
	{
		selectElement.close();
	}

	$( this ).on( 'mousemove', function(eMove)
	{
		if ( !$('#canvas-lock').prop('checked') )
		{
			spriteElement.x = eMove.pageX - startSpriteX;
			spriteElement.y = eMove.pageY - startSpriteY;

			inputSpriteMapX.val(spriteElement.x);
			inputSpriteMapY.val(spriteElement.y);
		}
		else
		{
			if ( selectClicked )
			{
				selectElement.x = eMove.pageX - startSelX;;
				selectElement.y = eMove.pageY - startSelY;;
			}
			else
			{
				selectElement.opened = true;

				moveX = eMove.pageX - spriteMap.position().left;
				moveY = eMove.pageY - spriteMap.position().top;

				selectElement.x = Math.min(posX, moveX);
				selectElement.y = Math.min(posY, moveY);
				selectElement.w = Math.abs(moveX - posX);
				selectElement.h = Math.abs(moveY - posY);

				inputSelectW.val(selectElement.w);
				inputSelectH.val(selectElement.h);
			}

			var relCoord = relativeCoordinates(spriteElement, selectElement);

			inputSelectX.val(relCoord.x);
			inputSelectY.val(relCoord.y);
		}

		draw();
	});

	draw();
});

spriteMap.mouseup( function(e)
{
	$( this ).off( 'mousemove' );
});


/*----------------------------------------------------------------------------*/
/*							KEYBOARD CONTROLS 								  */
/*----------------------------------------------------------------------------*/

$(document).keydown( function (e)
{
	if ( selectElement.opened )
	{
		if ( !e.metaKey )
		{
			switch ( e.keyCode )
			{
				case 37: // left
					selectElement.x --;
					break;
				case 38: // up
					selectElement.y --;
					break;
				case 39: // right
					selectElement.x ++;
					break;
				case 40: // down
					selectElement.y ++;
					break;
			}
		}
		else
		{
			switch ( e.keyCode )
			{
				case 37: // left
					selectElement.w --;
					break;
				case 38: // up
					selectElement.h --;
					break;
				case 39: // right
					selectElement.w ++;
					break;
				case 40: // down
					selectElement.h ++;
					break;
			}
		}

		var relCoord = relativeCoordinates(spriteElement, selectElement);

		inputSelectX.val(relCoord.x);
		inputSelectY.val(relCoord.y);
		inputSelectW.val(selectElement.w);
		inputSelectH.val(selectElement.h);

		draw();
	}
});


/*----------------------------------------------------------------------------*/
/*							UTILITIES & STUFF								  */
/*----------------------------------------------------------------------------*/

function relativeCoordinates(elementA, elementB)
{
	// element A is the element chosen for reference
	// we want element B coordinates relative to element A
	var relX = elementA.x - elementB.x;
	var relY = elementA.y - elementB.y;

	return {x: relX, y: relY};
}

