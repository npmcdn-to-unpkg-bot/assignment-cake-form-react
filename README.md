# ustwo Assignment

## Running the assignment

    npm install
    npm run dev

Then in your browser go to:

    http://localhost:8000

## Running the tests

To run the tests, first:

1. Ensure PhantomJS is installed (see Note about PhantomJS below)
2. Run the assignment in one terminal window
3. Run the tests in another terminal window

Run the tests using:

    npm run test

Note that the tests assume the assignment is running on `http://localhost:8000`.

## Linting the code

Currently using the [Airbnb ESLint config](https://www.npmjs.com/package/eslint-config-airbnb).

    npm run lint

## A few notes about the assignment

### Code

* CSS is written in [Stylus](http://stylus-lang.com/)
* JavaScript is written in ES6 and transpiled using [Babel](https://babeljs.io/)

### Browser Compatibility

* The markup should hopefully be mobile friendly.
* To keep the assignment simple it's written for modern browsers, tested in Firefox and Chrome (and Chrome's mobile screen size emulator).

### Tests

* Currently only testing the logic for the Celebration Type Other field.
* I wanted to write the tests in ES6, not sure of the best way to do this so with Casper so I transpile into ES5 in the `/build-test` directory and run them from there. At the moment the test file needs to be named `index.js`. Still need to work out how to run tests using a different file name.

### TODO

* Add production builds that minify the JS/CSS and hash the generated file names.
* See if there is a better way to write Casper tests in ES6.
* Consider adding unit tests (maybe simpler when using a framework)

## Note about PhantomJS

[PhantomJS](http://phantomjs.org/) is required to run the tests. Download and install from <http://phantomjs.org/>

You may need to set a `PHANTOMJS_EXECUTABLE` variable. For example, if you installed PhantomJS in `/var/opt` then you may set a variable such as:

    PHANTOMJS_EXECUTABLE=/var/opt/phantomjs-2.1.1-linux-x86_64/bin/phantomjs
