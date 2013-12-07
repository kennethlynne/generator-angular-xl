# AngularJS generator 
Angular generator is awesome, but it is missing some spice to become really useful in larger applications.
This is the same generator, customized to use some nice patterns and best-practices.

Maintainer: [Kenneth Lynne](https://github.com/kennethlynne)

Based on [angular-seed](https://github.com/angular/angular-seed/) and [generator-angular](https://github.com/yeoman/generator-angular).

## Usage

Install `generator-angular`:
There is not yet registered a NPM package. So for now:
```
npm install -g https://github.com/kennethlynne/generator-angular-sockless.git
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo angular-sockless`, optionally passing an app name:
```
yo angular-sockless [app-name]
```

## Module
Module.js contains the applications main module definition. All dependancies for your application needs to be specified here.

## Generators

Available generators:

* [angular-sockless](#app) (aka [angular-sockless:app](#app))
* [angular-sockless:controller](#controller)
* [angular-sockless:directive](#directive)
* [angular-sockless:component](#component)
* [angular-sockless:filter](#filter)
* [angular-sockless:route](#route)
* [angular-sockless:service](#service)
* [angular-sockless:provider](#service)
* [angular-sockless:factory](#service)
* [angular-sockless:value](#service)
* [angular-sockless:constant](#service)
* [angular-sockless:decorator] (#decorator)
* [angular-sockless:view](#view)

**Note: Generators are to be run from the root directory of your app.**

### App
Sets up a new AngularJS app, generating all the boilerplate you need to get started. The app generator also optionally installs Twitter Bootstrap and additional AngularJS modules, such as angular-resource.

Example:
```bash
yo angular-sockless
```

### Route
Generates a controller and view, and configures a route in `app/scripts/config/routes.js` connecting them.

Example:
```bash
yo angular-sockless:route myroute
```

Produces `app/scripts/controllers/myroute.js`:
```javascript
angular.module('myMod').controller('MyrouteCtrl', function ($scope) {
  // ...
});
```

Produces `app/views/myroute.html`:
```html
<p>This is the myroute view</p>
```

### Controller
Generates a controller in `app/scripts/controllers` and an accompanying test in `test/spec/controllers`.
Every controller is generated with an accompanying initService, that is responsible for fetching data and returning a promise.
This promise will be resolved before the controller is instantiated.

Example:
```bash
yo angular-sockless:controller user
```

Produces `app/scripts/controllers/user.js`:
```javascript
angular.module('myMod').controller('UserCtrl', function ($scope) {
  // ...
});
```
### Directive
Generates a directive in `app/scripts/directives`.

Example:
```bash
yo angular-sockless:directive myDirective
```

Produces `app/scripts/directives/myDirective.js`:
```javascript
angular.module('myMod').directive('myDirective', function () {
  return {
    template: '<div></div>',
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      element.text('this is the myDirective directive');
    }
  };
});
```
### Component
A component is basically a element directive that has been prebound to use a view located in `app/views/component/<component-name>/<component-name>.html`.
This helps keep complexity low, and makes it easy to separate parts of your application into smaller and more maintainable parts.
Generates a directive in `app/scripts/components` that uses a factory called `componentFactory` for convention over configuration.

Example:
```bash
yo angular-sockless:component myComponent
```
### Filter
Generates a filter in `app/scripts/filters`.

Example:
```bash
yo angular-sockless:filter myFilter
```

Produces `app/scripts/filters/myFilter.js`:
```javascript
angular.module('myMod').filter('myFilter', function () {
  return function (input) {
    return 'myFilter filter:' + input;
  };
});
```

### View
Generates an HTML view file in `app/views`.

Example:
```bash
yo angular-sockless:view user
```

Produces `app/views/user.html`:
```html
<p>This is the user view</p>
```

### Service
Generates an AngularJS service.

Example:
```bash
yo angular-sockless:service myService
```

Produces `app/scripts/services/myService.js`:
```javascript
angular.module('myMod').service('myService', function () {
  // ...
});
```

You can also do `yo angular:factory`, `yo angular:provider`, `yo angular:value`, and `yo angular:constant` for other types of services.

### Decorator
Generates an AngularJS service decorator.

Example:
```bash
yo angular-sockless:decorator serviceName
```

Produces `app/scripts/decorators/serviceNameDecorator.js`:
```javascript
angular.module('myMod').config(function ($provide) {
    $provide.decorator('serviceName', function ($delegate) {
      // ...
      return $delegate;
    });
  });
```

## Options
In general, these options can be applied to any generator, though they only affect generators that produce scripts.

### CoffeeScript
CoffeScript is not supported for now for maintenance reasons. Coffescript is awesome, but I won't spend the time necessary to maintain different versions for now. May be added in the future.

### Minification Safe
The recommended build process uses `ngmin`, a tool that automatically adds these annotations. However, if you'd rather not use `ngmin`, you have to add these annotations manually yourself.

### Add to Index
By default, new scripts are added to the index.html file. However, this may not always be suitable. Some use cases:

* Manually added to the file
* Auto-added by a 3rd party plugin
* Using this generator as a subgenerator

To skip adding them to the index, pass in the skip-add argument:
```bash
yo angular-sockless:service serviceName --skip-add
```

## Bower Components

The following packages are always installed by the [app](#app) generator:

* angular
* angular-mocks
* angular-scenario


The following additional modules are available as components on bower, and installable via `bower install`:

* angular-cookies
* angular-loader
* angular-resource
* angular-sanitize

All of these can be updated with `bower update` as new versions of AngularJS are released.

## Configuration
Yeoman generated projects can be further tweaked according to your needs by modifying project files appropriately.

### Output
You can change the `app` directory by adding a `appPath` property to `bower.json`. For instance, if you wanted to easily integrate with Express.js, you could add the following:

```json
{
  "name": "yo-test",
  "version": "0.0.0",
  ...
  "appPath": "public"
}

```
This will cause Yeoman-generated client-side files to be placed in `public`.

## Testing

Running `grunt test` will run the unit tests with karma.

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a PR, make sure that the commit messages match the [AngularJS conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/).

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
