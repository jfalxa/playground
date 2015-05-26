import $ from 'jquery';


const ui =
{
    countdown : $( '.countdown' ),
    restart   : $( '.btn-restart' ),
    rock      : $( '.btn-rock' ),
    paper     : $( '.btn-paper' ),
    scissors  : $( '.btn-scissors' )
};



function lock()
{
    ui.rock.prop( 'disabled', true );
    ui.paper.prop( 'disabled', true );
    ui.scissors.prop( 'disabled', true );
}


function unlock()
{
    ui.rock.prop( 'disabled', false );
    ui.paper.prop( 'disabled', false );
    ui.scissors.prop( 'disabled', false );
}


const countdown =
{
    id           : -1,
    value        : 3,
    initialValue : 3,

    reset : () =>
    {
        countdown.id    = -1;
        countdown.value = countdown.initialValue;
        setCountdown();
        unlock();
    },

    start : () =>
    {
        countdown.id = setInterval( countdown.decrease, 1000 );
    },

    stop : () =>
    {
        clearInterval( countdown.id );
    },

    decrease : () =>
    {
        countdown.value--;
        setCountdown();

        if ( !countdown.value )
        {
            countdown.stop();
            lock();
        }
    }
};


function setCountdown( value )
{
    ui.countdown.text( countdown.value );
}



function onChoiceClick( e )
{
    var choice = $( this ).data( 'value' );
    $( '.chosen' ).removeClass( 'chosen' );
    $( this ).addClass( 'chosen' );
}


function onRestartClick( e )
{
    countdown.reset();
    countdown.start();
}


function initListeners()
{
    ui.rock.on( 'click', onChoiceClick );
    ui.paper.on( 'click', onChoiceClick );
    ui.scissors.on( 'click', onChoiceClick );

    ui.restart.on( 'click', onRestartClick );
}





export default function app()
{
    initListeners();
}
