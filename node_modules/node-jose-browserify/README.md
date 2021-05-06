[![published](https://static.production.devnetcloud.com/codeexchange/assets/images/devnet-published.svg)](https://developer.cisco.com/codeexchange/github/repo/NewtonJoshua/node-jose-browserify)

# node-jose-browserify #

An advanced version of Cisco's node-jose module that works in both browser and the server. It is compatible with node.js and angular

Refer to https://github.com/cisco/node-jose for documentation.

### Install ###

```javascript
    npm i node-jose-browserify
```


## Angular Usage ##

Import and use as any other package. All the methods will be supported in the browser, just as in node.js.

```javascript
import * as jose from 'node-jose-browserify';
```

The following changes are required to make few node-modules available in the browser

- angular compilerOptions for stream

    In `tsconfig.json` , *compilerOptions* add
    ```json
    "paths": {
        "stream": ["../node_modules/stream-browserify/index.js"]
    }
    ```
    This is to avoid the below error
    > ERROR in ./node_modules/browserify-zlib/lib/index.js.
    > Module not found: Error: Can't resolve 'stream' in '***/node_modules/browserify-zlib/lib'
- polyfil for global object
    In `polyfills.ts` add 
    ```
    // Polyfill for node-jose
    (window as any)['global'] = window;
    ```
    This is to avoid the below error
    > Uncaught ReferenceError: global is not defined


### Merging node-jose updates

To pull the latest updates from node-jose into node-jose-browserify
```
$ git pull https://github.com/cisco/node-jose.git master
```

### PR ###

PR https://github.com/cisco/node-jose/pull/264 is raised to merge the changes with the node-jose repo
