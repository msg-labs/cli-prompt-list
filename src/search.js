/*
 * Sorts candidates based on the compareFunction. If none it falls back to the
 * default JS behavior.
 *
 * @param {Array<any>} candidates Collection of candidates to be sorted.
 * @param {(a: any, b: any) => Number | undefined} compareFunction Custom
 * function to sort the elements.
 *
 * @return {Array<any>} Array sorted following the compareFunction.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 *
 */
const sortCandidates = ( candidates, compareFunction ) => candidates
    .sort( compareFunction );

const filterCandidates = ( input, candidates, matchField ) => candidates
    .filter( candidate => matchField( candidate )
        .toLowerCase()
        .includes( input ) );

const defaultMatchField = candidate => String( candidate );

const defaultSortFunction = matchField => ( a, b ) => matchField( a )
    .localeCompare( matchField( b ) );

const deleteStart = 0;
const deleteEnd = -1;


const search = ( candidates = [], options = {} ) => {

    const {
        input = '',
        matchField,
        compareFunction
    } = options;

    return {

        append ( value ) {
            this.searchInput = `${ this.input }${ value }`;
        },

        set candidates ( newCandidates ) {
            this.searchCandidates = newCandidates;
        },

        get candidates () {
            return sortCandidates(
                filterCandidates(
                    this.input,
                    this.searchCandidates,
                    matchField || defaultMatchField
                ),
                compareFunction || defaultSortFunction( matchField || defaultMatchField ),
                !compareFunction && matchField ? matchField : defaultMatchField
            );
        },

        set input ( value ) {
            this.searchInput = [ ...input ].join( '' );
        },

        get input () {
            return this.searchInput;
        },

        remove () {
            this.searchInput = this.input.slice( deleteStart, deleteEnd );
        },

        reset () {
            this.input = '';
            this.candidates = candidates;
        },

        searchCandidates: [ ...candidates ],

        searchInput: [ ...input ].join( '' )

    };

};

module.exports = search;
