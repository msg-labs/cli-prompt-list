const search = require( './search.js' );


describe( 'generic search', () => {

    it( 'exposes candidates through the `candidates` property', () => {

        expect.assertions( 1 );
        const result = search( [ 'a' ] );

        expect( result.candidates ).toStrictEqual( [ 'a' ] );

    } );

    it( 'initializes as empty if no params are provided', () => {

        expect.assertions( 1 );
        const result = search();

        expect( result.candidates ).toStrictEqual( [] );

    } );

    it( 'filters elements containing the input text', () => {

        expect.assertions( 1 );
        const result = search( [ 'some', 'test', 'array' ] );

        result.append( 'e' );

        expect( result.candidates ).toStrictEqual( [ 'some', 'test' ] );

    } );

    it( 'accepts an initial filter', () => {

        expect.assertions( 1 );
        const result = search( [ 'some', 'test', 'array' ], { input: 'ar' } );

        expect( result.candidates ).toStrictEqual( [ 'array' ] );

    } );

    it( 'allows appending values to the current search', () => {

        expect.assertions( 1 );
        const result = search( [ 'some', 'test', 'array' ] );

        result.append( 'e' );
        result.append( 's' );

        expect( result.candidates ).toStrictEqual( [ 'test' ] );

    } );

    it( 'allows resetting the current search to the initial value', () => {

        expect.assertions( 1 );
        const result = search( [ 'some', 'test', 'array' ], { input: 'e' } );
        const initialResult = result.candidates;

        result.append( 's' );
        result.reset();

        expect( result.candidates ).toStrictEqual( initialResult );

    } );


    it( 'allows deletion of values', () => {

        expect.assertions( 1 );
        const result = search( [ 'some', 'test', 'array' ] );

        result.append( 'e' );
        result.append( 's' );
        result.remove();

        expect( result.candidates ).toStrictEqual( [ 'some', 'test' ] );

    } );

    it( 'avoids deleting input elements if there are no more', () => {

        expect.assertions( 1 );
        const result = search();

        result.remove();

        expect( result.candidates ).toStrictEqual( [] );

    } );

    it( 'sorts candidates alphabetically by default', () => {

        expect.assertions( 1 );

        const candidates = [ 'aa test', 'ak test', 'ac test' ];
        const sortedCandidates = [ 'aa test', 'ac test', 'ak test' ];

        const result = search( candidates );

        expect( result.candidates )
            .toStrictEqual( sortedCandidates );

    } );

    it( 'accepts a custom compare function', () => {

        expect.assertions( 1 );

        const compareFunction = ( a, b ) => b.localeCompare( a );
        const candidates = [ 'b', 'c', 'a' ];
        const sortedCandidates = [ 'c', 'b', 'a' ];

        const result = search( candidates, { compareFunction } );

        expect( result.candidates ).toStrictEqual( sortedCandidates );

    } );


    it( 'accepts a custom match field function', () => {

        expect.assertions( 1 );
        const matchField = candidate => candidate.title;
        const candidates = [
            { title: 'some' },
            { title: 'test' },
            { title: 'fields' }
        ];

        const result = search( candidates, {
            input: 'st',
            matchField
        } );

        expect( result.candidates ).toStrictEqual( [ { title: 'test' } ] );

    } );

    it( 'sorts by the matched field by default', () => {

        expect.assertions( 1 );
        const matchField = candidate => candidate.title;
        const candidates = [
            { title: 'some' },
            { title: 'test' },
            { title: 'fields' }
        ];
        const sortedCandidates = [
            { title: 'fields' },
            { title: 'some' },
            { title: 'test' }
        ];

        const result = search( candidates, {
            input: 's',
            matchField
        } );

        expect( result.candidates ).toStrictEqual( sortedCandidates );

    } );


    it( 'supports both custom matches and custom sort functions', () => {

        expect.assertions( 1 );
        const matchField = ( { title } ) => title;
        const compareFunction = ( a, b ) => a.order - b.order;
        const candidates = [
            {
                order: 100,
                title: 'some'
            },
            {
                order: 2,
                title: 'test'
            },
            {
                order: 8,
                title: 'escape'
            }
        ];
        const sortedCandidates = [
            {
                order: 2,
                title: 'test'
            },
            {
                order: 8,
                title: 'escape'
            }
        ];

        const result = search( candidates, {
            compareFunction,
            input: 'es',
            matchField
        } );

        expect( result.candidates ).toStrictEqual( sortedCandidates );

    } );

    it( 'doesn\'t limit the output in absence of limit', () => {

        expect.assertions( 1 );
        const candidates = [ 'first', 'second', 'second-to-last' ];
        const result = search( candidates );

        expect( result.candidates ).toStrictEqual( [ ...candidates ] );

    } );

    it( 'limits the output if a limit is given', () => {

        expect.assertions( 1 );
        const candidates = [ 'first', 'second', 'second-to-last' ];
        const result = search( candidates, { limit: 1 } );

        expect( result.candidates ).toStrictEqual( [ 'first' ] );

    } );

} );

