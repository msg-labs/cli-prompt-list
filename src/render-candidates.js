const renderCandidates = ( search, renderLine ) =>
    search.candidates
        .map( ( ...args ) => renderLine( ...args, search.input ) )
        .join( '\n' );

module.exports = renderCandidates;

