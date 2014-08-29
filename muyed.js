function muy( blabla )
{
	var muyedBlabla = '';
	var splitted = blabla.split( ' ' );

	for ( var i=0; i<splitted.length; i++ )
	{
		var muyedWord = 'm';
		var wordLength = splitted[i].length - 2;

		if ( wordLength > 0 )
		{
			for ( var j=0; j<wordLength; j++ )
			{
				muyedWord += 'u';
			}
		}
		else
		{
			muyedWord += 'u';
		}

		muyedWord += 'y';

		muyedBlabla += muyedWord + ' ';
	}

	return muyedBlabla;
}