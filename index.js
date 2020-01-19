const rpl = require( './src/rpl.js' );
const search = require( './src/search.js' );

module.exports = ( candidates, prompt, renderLine, options ) =>
    rpl( search( candidates, options ), prompt, renderLine );
