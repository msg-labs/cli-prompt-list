// Node.js
const process = require( 'process' );

// External
const escapes = require( 'ansi-escapes' );


const write = ( ...args ) => process.stdout.write( ...args );
const escape = ( method, ...args ) => write( args.length ?
    escapes[ method ]( ...args ) :
    escapes[ method ] );

const characters = {
    BACKSPACE: 'backspace',
    CTRLC: 'ctrlc',
    ESC: 'esc',
    RETURN: 'return'
};
const sequences = {
    [ characters.BACKSPACE ]: key => key.name === 'backspace',
    [ characters.CTRLC ]: key => key.sequence === '\u0003' || key.ctrl && key.name === 'c',
    [ characters.ESC ]: key => key.name === 'escape' || key.sequence === '\u001b',
    [ characters.RETURN ]: key => key.name === 'return'
};

const getSequence = keyStroke => {

    const complexSequence = Object
        .entries( sequences )
        .map( ( [ key, value ] ) => [
            key,
            value( keyStroke )
        ] )
        .filter( ( [ , value ] ) => value )
        .map( ( [ key ] ) => key )
        .pop();

    return complexSequence || keyStroke.sequence;

};

module.exports = {
    characters,
    escape,
    getSequence,
    write
};
