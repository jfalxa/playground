CanvasElement = function ( posX, posY, width, height, drawMethod)
{
	this.display	= true,

	this.posX		= posX;
	this.posY		= posY;
	this.width		= width;
	this.height		= height;

	this.drawMethod	= drawMethod;

	this.draw = function ()
	{
		if ( this.display )
		{
			this.drawMethod();
		}
	}

	this.show = function ()
	{
		this.display = true;
	}

	this.hide = function ()
	{
		this.display = false;
	}

	this.isClicked = function ( clickX, clickY )
	{
		var clicked = false;
		return clicked;
	}

}