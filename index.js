const cli = require( './src/cli.js' );
const search = require( './src/search.js' );

module.exports = ( candidates, prompt, renderLine, options ) =>
    cli( search( candidates, options ), prompt, renderLine );
