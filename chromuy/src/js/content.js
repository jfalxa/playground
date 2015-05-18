var LATIN_RX = /^[a-zA-Z\-_’'‘ÆÐƎƏƐƔĲŊŒẞÞǷȜæðǝəɛɣĳŋœĸſßþƿȝĄƁÇĐƊĘĦĮƘŁØƠŞȘŢȚŦŲƯY̨Ƴąɓçđɗęħįƙłøơşșţțŧųưy̨ƴÁÀÂÄǍĂĀÃÅǺĄÆǼǢƁĆĊĈČÇĎḌĐƊÐÉÈĖÊËĚĔĒĘẸƎƏƐĠĜǦĞĢƔáàâäǎăāãåǻąæǽǣɓćċĉčçďḍđɗðéèėêëěĕēęẹǝəɛġĝǧğģɣĤḤĦIÍÌİÎÏǏĬĪĨĮỊĲĴĶƘĹĻŁĽĿʼNŃN̈ŇÑŅŊÓÒÔÖǑŎŌÕŐỌØǾƠŒĥḥħıíìiîïǐĭīĩįịĳĵķƙĸĺļłľŀŉńn̈ňñņŋóòôöǒŏōõőọøǿơœŔŘŖŚŜŠŞȘṢẞŤŢṬŦÞÚÙÛÜǓŬŪŨŰŮŲỤƯẂẀŴẄǷÝỲŶŸȲỸƳŹŻŽẒŕřŗſśŝšşșṣßťţṭŧþúùûüǔŭūũűůųụưẃẁŵẅƿýỳŷÿȳỹƴźżžẓ]$/;

function toMuy( text )
{
    var muyed   = text.split( '' );
    var muyndex = -1;

    for ( var i=0, len=muyed.length; i<len; i++ )
    {
        if ( LATIN_RX.test( muyed[i] ) )
        {
            muyed[i] = muyndex >= 0 ? 'u' : 'm';
            muyndex  = i;
        }
        else if ( muyndex >= 0 )
        {
            if ( muyed[muyndex-1] === 'm' )
            {
                muyed.splice( muyndex, 0, 'u' );

                muyndex++;
                len++;
                i++;
            }

            muyed[muyndex] = 'y';
            muyndex        = -1;
        }
    }

    if ( muyndex >= 0 )
    {
        muyed[muyndex] = 'y';
    }

    return muyed.join( '' );
}

function simuy()
{
    var tag;

    var allTags = document.getElementsByTagName( '*' );

    for ( var i=0, len=allTags.length; i<len; i++ )
    {
        tag = allTags[i];

        if ( tag.children.length === 0 )
        {
            if ( tag.innerHTML )
            {
                tag.innerHTML = toMuy( tag.innerHTML );
            }

            if ( tag.value )
            {
                tag.value = toMuy( tag.value );
            }
        }
    }
}

simuy();
