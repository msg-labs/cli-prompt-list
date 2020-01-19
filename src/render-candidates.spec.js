const renderCandidates = require( './render-candidates.js' );
const search = require( './search.js' );

describe( 'render-candidates', () => {

    it( 'calls render line on each candidate', () => {

        expect.assertions( 1 );

        const simpleSearch = search( [ 'a', 'b', 'aa' ] );
        const renderLine = jest.fn();

        renderCandidates( simpleSearch, renderLine );

        expect( renderLine ).toHaveBeenCalledTimes( 3 );

    } );

    it( 'calls render line on active candidates', () => {

        expect.assertions( 1 );

        const simpleSearch = search( [ 'a', 'b', 'aa' ], { input: 'a' } );
        const renderLine = jest.fn();

        renderCandidates( simpleSearch, renderLine );

        expect( renderLine ).toHaveBeenCalledTimes( 2 );

    } );


    it( 'calls render line with four arguments', () => {

        expect.assertions( 1 );

        const simpleSearch = search( [ 'first', 'second' ], { input: 'f' } );
        const renderLine = jest.fn();

        renderCandidates( simpleSearch, renderLine );

        expect( renderLine ).toHaveBeenCalledWith( 'first', 0, [ 'first' ], 'f' );
    } );


    it( 'joins the rendered elements', () => {

        expect.assertions( 1 );

        const simpleSearch = search( [ 'a', 'b' ] );
        const renderLine = candidate => candidate;

        const output = renderCandidates( simpleSearch, renderLine );

        expect( output ).toStrictEqual( 'a\nb' );

    } );

} );
