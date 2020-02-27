const { getSequence } = require( './utils.js' );


describe( 'utils', () => {

    describe( 'escape', () => {

        beforeEach( () => {
            jest.resetModules();
        } );

        it( 'returns the value if no args provided', () => {

            expect.assertions( 1 );

            const write = jest.fn();

            jest.doMock( 'process', () => ( {
                stdout: {
                    write
                }
            } ) );
            jest.doMock( 'ansi-escapes', () => ( {
                test: 'value'
            } ) );

            const { escape } = require( './utils.js' );

            escape( 'test' );

            expect( write ).toHaveBeenCalledWith( 'value' );

        } );

        it( 'passes the parameters to the escape method', () => {
            expect.assertions( 1 );

            const test = jest.fn();

            jest.doMock( 'ansi-escapes', () => ( { test } ) );

            const { escape } = require( './utils.js' );

            escape( 'test', 1, 3, 100 );

            expect( test ).toHaveBeenCalledWith( 1, 3, 100 );

        } );

    } );

    describe( 'getSequence', () => {

        it( 'identifies backspaces', () => {

            expect.assertions( 1 );
            const result = getSequence( {
                name: 'backspace',
                sequence: ''
            } );

            expect( result ).toStrictEqual( 'backspace' );

        } );

        it( 'identifies sequence based CTRL-C', () => {

            expect.assertions( 1 );
            const result = getSequence( {
                name: '',
                sequence: '\u0003'
            } );

            expect( result ).toStrictEqual( 'ctrlc' );

        } );

        it( 'identifies natural CTRL-C', () => {

            expect.assertions( 1 );
            const result = getSequence( {
                ctrl: true,
                name: 'c'
            } );

            expect( result ).toStrictEqual( 'ctrlc' );

        } );

        it( 'identifies the return key', () => {

            expect.assertions( 1 );
            const result = getSequence( {
                name: 'return',
                sequence: '\r'
            } );

            expect( result ).toStrictEqual( 'return' );

        } );

        it( 'identifies letters', () => {

            expect.assertions( 1 );
            const result = getSequence( {
                name: 'c',
                sequence: 'c'
            } );

            expect( result ).toStrictEqual( 'c' );

        } );

        it( 'identifies numbers', () => {

            expect.assertions( 1 );
            const result = getSequence( {
                name: '2',
                sequence: '2'
            } );

            expect( result ).toStrictEqual( '2' );

        } );

        it( 'identifies other characters', () => {

            expect.assertions( 1 );
            const result = getSequence( {
                name: undefined,
                sequence: '-'
            } );

            expect( result ).toStrictEqual( '-' );

        } );

    } );

} );
