# cli-nteractive-list

## Installation

```sh
npm install --save @msg-labs/cli-interative-list
```

## Usage

Default functionality:

```js
const askForRepo = require( '@msg-labs/cli-interactive-list' );

const repos = [
  'aredridel/node-bin-gen',
  'axios/axios',
  'bitinn/node-fetch',
  'browserify/resolve',
  'chaijs/chai',
  'DefinitelyTyped/DefinitelyTyped',
  'isaacs/rimraf'
];

askForRepo( repos )
    .then( response => console.dir( response ) );

```
For all the available options, see the API section.

## API
```typescript
type InteractiveList<T> = (
    candidates: Array<T>,
    prompt?: string,
    renderLine?: (
        candidate?: T,
        index?: number,
        candidates?: Array<T>,
        search?: string
    ) => string,
    searchOptions?: {
        input?: string,
        matchField?: (candidate: T) => any,
        compareFunction?: (
            a?: T,
            b?: T
        ) => boolean
    }
) => Promise<T>;
```
| Parameter | Type | Default | Description |
|-|-|-|-|
| candidates | Array | `[]` | List of elements to search |
| prompt | string | `'> '` | Text to be displayed next to the input |
| renderLine | function | `candidate => candidate` | Used to transform the output of each line |
| searchOptions | Object | ` { input: '', matchField: candidate => String( candidate ), compareFunction: ( a, b )  => matchField( a).localeCompare( matchField( b ) ) }` | Custom options for the search function |

