// Node
const process = require( 'process' );
const readLine = require( 'readline' );

// Application
const {
    write,
    escape,
    getSequence,
    characters
} = require( './utils.js' );
const renderCandidates = require( './render-candidates.js' );


const EXIT_CODES = {
    ok: 0
};

let prompt = '';

const setup = () => {

    readLine.emitKeypressEvents( process.stdin );
    process.stdin.setRawMode( true );
    process.stdin.resume();
    process.stdin.setEncoding( 'utf8' );

    write( prompt );

};

let outputCache = '';

const printCandidates = ( search, renderLine ) => {

    const output = renderCandidates( search, renderLine );

    if ( output !== outputCache ) {
        escape( 'eraseDown' );
        write( '\n' );
        write( output );
        escape( 'cursorUp', search.candidates.length || 1 );
        outputCache = output;
    }

    /*
     * Opted for a manual position restoring instead of saving the current
     * position and restoring it later on to avoid overflow issues if the prompt
     * happens to be at the very end of the screen. If that happens the cursor
     * will appear on the original position and won't take in account that the
     * terminal has scrolled
     */
    escape( 'cursorLeft' );
    escape( 'cursorForward', `${ prompt }${ search.input }`.length );

};

const onCtrlC = () => {
    write( '\n' );
    escape( 'eraseDown' );
    // eslint-disable-next-line no-process-exit
    process.exit( EXIT_CODES.ok );
};

const onReturn = () => {
    escape( 'cursorPrevLine' );
    write( '\n' );
    escape( 'eraseDown' );
    process.stdin.pause();
};

const onDelete = ( search, pluck ) => {
    if ( search.input.length ) {
        const previousCharacter = 1;

        escape( 'cursorBackward', previousCharacter );
        escape( 'eraseEndLine' );

        search.remove();
        printCandidates( search, pluck );
    }
};

const exitAndReject = reject => error => {
    process.stdin.pause();
    process.stdin.setRawMode( false );
    reject( error );
};

const defaultPluck = ( candidate, index ) =>
    `${ index === 0 ? '>' : ' ' } ${ candidate.toString() }`;

const rpl = ( search, userPrompt = '> ', pluck = defaultPluck ) =>
    new Promise( ( resolve, reject ) => {

        prompt = userPrompt;

        setup();

        printCandidates( search, pluck );


        process.stdin.on( 'keypress', ( character, key ) => {

            const sequence = getSequence( key );

            switch ( sequence ) {
                case characters.ESC :
                case characters.CTRLC :
                    onCtrlC();
                    break;
                case characters.RETURN :
                    onReturn();
                    resolve( search.candidates[ 0 ] );
                    break;
                case characters.BACKSPACE :
                    onDelete( search, pluck );
                    break;
                default :
                    write( character );
                    search.append( sequence );
                    printCandidates( search, pluck );
            }

        } );

        process.stdin.on( 'error', exitAndReject( reject ) );


    } )
        .catch( error => {
            exitAndReject( promiseError => {
                throw promiseError;
            } )( error );
        } );

module.exports = rpl;

