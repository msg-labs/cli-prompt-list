# cli-prompt-list

## Installation

```sh
npm install --save @msg-labs/cli-prompt-list
```

## Usage

Default functionality:

```js
const promptForRepo = require( '@msg-labs/cli-prompt-list' );

const repos = [
  'aredridel/node-bin-gen',
  'axios/axios',
  'bitinn/node-fetch',
  'browserify/resolve',
  'chaijs/chai',
  'DefinitelyTyped/DefinitelyTyped',
  'isaacs/rimraf'
];

promptForRepo( repos )
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
| candidates | Array | `undefined` | List of elements to search |
| prompt | string | `'> '` | Text to be displayed next to the input |
| renderLine | function | `candidate => candidate` | Used to transform the output of each line |
| searchOptions | Object | see below | Custom search options |
| searchOptions.input | string | `''` | Initial input |
| searchOptions.matchField | function | `candidate => String( candidate )` | Selects which field will be used in the compare function |
| searchOptions.compareFunction | function | `( a, b )  => matchField( a).localeCompare( matchField( b ) )` | Defines how fields will be sorted after the search |

