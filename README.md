# angular-wheel
[![Build Status](https://travis-ci.org/joelmukuthu/angular-wheel.svg?branch=master)](https://travis-ci.org/joelmukuthu/angular-wheel) [![Dependency Status](https://david-dm.org/joelmukuthu/angular-wheel.svg)](https://david-dm.org/joelmukuthu/angular-wheel) [![Licence](https://img.shields.io/npm/l/angular-wheel.svg?maxAge=2592000)]() [![Coverage Status](https://coveralls.io/repos/joelmukuthu/angular-wheel/badge.svg)](https://coveralls.io/r/joelmukuthu/angular-wheel) [![Bower version](https://img.shields.io/bower/v/angular-wheel.svg?maxAge=2592000)]() [![npm version](https://img.shields.io/npm/v/angular-wheel.svg?maxAge=2592000)]()

angular-wheel exposes a service that allows you to bind mousewheel events to an angular element.

### Installation
Install with bower:
```sh
bower install angular-wheel
```
Or with npm:
```sh
npm install angular-wheel
```
Or simply download the [latest release](https://github.com/joelmukuthu/angular-wheel/releases/latest).

### Usage
The pre-built files can be found in the `dist/` directory.
`dist/angular-wheel.min.js` is minified and production-ready. Example usage:
```html
<script src="dist/angular-wheel.min.js"></script>
```
Add `jm.wheel` to your app's module dependencies:
```javascript
angular.module('myapp', ['jm.wheel']);
```
And now you can use the `jmWheel` service in your controllers, directives,
services etc. Example usage in a controller:
```javascript
app.controller('MyController', ['jmWheel', function (jmWheel) {
    var target = angular.element('#someElement');
    // To listen for mousewheel events
    jmWheel.bind(target, {
        up: function (event) {
            console.log('mousewheel up on element #someElement!');
        },
        down: function (event) {
            console.log('mousewheel down on element #someElement!');
            // to prevent scrolling, use event.preventDefault();
        }
    });
    // To unbind:
    jmWheel.unbind(target);
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
