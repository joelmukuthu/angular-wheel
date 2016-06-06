# angular-wheely
[![Build Status](https://travis-ci.org/joelmukuthu/angular-wheely.svg?branch=master)](https://travis-ci.org/joelmukuthu/angular-wheely) [![Dependency Status](https://david-dm.org/joelmukuthu/angular-wheely.svg)](https://david-dm.org/joelmukuthu/angular-wheely) [![Licence](https://img.shields.io/npm/l/angular-wheely.svg?maxAge=2592000)]() [![Coverage Status](https://coveralls.io/repos/joelmukuthu/angular-wheely/badge.svg)](https://coveralls.io/r/joelmukuthu/angular-wheely) [![Bower version](https://img.shields.io/bower/v/angular-wheely.svg?maxAge=2592000)]() [![npm version](https://img.shields.io/npm/v/angular-wheely.svg?maxAge=2592000)]()

angular-wheely exposes a service that allows you to bind mousewheel events to an angular element.

### Installation
Install with bower:
```sh
bower install angular-wheely
```
Or with npm:
```sh
npm install angular-wheely
```
Or simply download the [latest release](https://github.com/joelmukuthu/angular-wheely/releases/latest).

### Usage
The pre-built files can be found in the `dist/` directory.
`dist/angular-wheely.min.js` is minified and production-ready. Example usage:
```html
<script src="dist/angular-wheely.min.js"></script>
```
Add `wheely` to your app's module dependencies:
```javascript
angular.module('myapp', ['wheely']);
```
And now you can use the `wheely` service in your controllers, directives,
services etc. Example usage in a controller:
```javascript
app.controller('MyController', ['wheelie', function (wheelie) {
    var target = angular.element('#someElement');
    // To listen for mousewheel events
    wheelie.bind(target, {
        up: function (event) {
            console.log('mousewheel up on element #someElement!');
        },
        down: function (event) {
            console.log('mousewheel down on element #someElement!');
            // to prevent scrolling, use event.preventDefault();
        }
    });
    // To unbind:
    wheelie.unbind(target);
}]);
```

### Contributing
Contributions are welcomed! Here are the [contribution guidelines](CONTRIBUTING.md).

First clone the repository and install dependencies:
```sh
npm install
```
To run tests:
```sh
npm test
```
To lint the code:
```sh
npm run lint
```
To make a production build:
```sh
npm run build
```

### License
[The MIT License](LICENSE.md)
