# TreeApp
WinIt code challenge



# Requirements

You need Node 8.10.0 and mongodb 3.4.10 to run this

# Api

### Install
Navigate inside the api directory then run `npm install` to install node modules

### Config
you can edit the config file in `api/config.js`
```Javascript
module.exports = {
  // configure mongodb port, address and dbname to use
  db: {
    'address': 'localhost',
    'port': 27017,
    'name': 'treedb'
  },
  // configure address and port the api is listenning to
  app:{
    'address': 'localhost',
    'port': 8080
  },
  // configure the address and port the webapp will be launching requests from
  webapp:{
    'address': 'localhost',
    'port': 3000
  }
};

```

### Launch

Launch the server by running `node [path_to_index.js]`  
If you want to import a csv document run node with `--import [path_to_your_csvfile]`

ex:
```Shell Session
//launch server and import trees.csv data
$ node index.js --import ./trees.csv
// or launch the server with data already in the database
$ node index.js
```

# Webapp

### Install
Navigate insite de front directory then run `npm install` to install node modules

## Config
you can edit the api address the webapp will be using for requests from the config file in `front/src/config.js`

```Javascript
//example of configuration
export default {
  api: {
    address: 'localhost', 
    port: 8080, 
  },
};
```
### Launch

#### Development
To launch the app in development mode simply navigate to the front end directory then run `npm start` 

#### Production
To build the app in production mode navigate to the front end directory then run `npm build`

Now that the app have been built, you need to serve the build folder that have been created before

Easy way to serve:
```Shell Session
$ npm install -g serve
$ serve -p [port] [build_folder] 
```


# Conclusion

Ran out of time in the implement the responsive design better, it currently is a little bit rushed.
I also wanted to implement filters to get the closest tree using params (closest tree alive/dead, closest healthy tree etc..)
but again ran out of time for that.
