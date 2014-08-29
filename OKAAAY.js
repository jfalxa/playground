function okaaay( blabla )
{
	blabla = blabla.trim();
	blabla = blabla.toUpperCase();

	var baseRepeat		= 4;
	var regeeex			= /([A-Z]*?[^AEIOUY])?([AEIOUY]+)([^AEIOUY]+E?)?$/;

	var okaaayedBlabla	= '';
	var sentences		= blabla.split( '. ' );

	for ( var i in sentences )
	{
		var splitted		= sentences[i].split( ' ' );
		var okaaaySentence	= sentences[i].substring(0, sentences[i].lastIndexOf( ' ' ) );
		var lastWooord		= splitted[splitted.length-1];
		var foouuund		= regeeex.exec( lastWooord );

		var lastVoweeels	= foouuund[2] ? foouuund[2] : '';
		var newVoweeels		= '';

		if ( lastVoweeels.length > 0 )
		{
			var repeatCount = baseRepeat;
			for ( var j=lastVoweeels.length-1; j>=0; j-- )
			{
				var voweeel = lastVoweeels[j];

				for ( var k=0; k<repeatCount; k++ )
				{
					voweeel += lastVoweeels[j];
				}

				repeatCount = (repeatCount - 1) >= 1 ? repeatCount - 1 : 1 ;

				newVoweeels = voweeel + newVoweeels;
			}

			// replace last occurence
			var li		= lastWooord.lastIndexOf( lastVoweeels );
			lastWooord	= lastWooord.substr(0, li) + newVoweeels + lastWooord.substr( li + lastVoweeels.length );
		}

		okaaaySentence += ' ' + lastWooord + '! ';

		okaaayedBlabla += okaaaySentence;
	}

	return okaaayedBlabla.trim();
}