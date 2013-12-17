# Generator-angular-xl
Automate your workflow when implementing large scale AngularJS applications. Avoid boilerplate and improve productivity.
This tool will rock your world and speed up your development process by about 19 times.. Yeah. It's that good.. Stay in the zone, spend more time flowing and less time doing the boring stuff.
To sum up:
* All scripts in app/scrips and styles in app/styles will be automatically in minifiers, index.html and tests, no more hard-coding ```<script src=" ... " ...```. Need more control? Check out [resources.json](#resources.json) the same configuration is shared with minifiers and test runners.
* Test coverage using [Istanbul](http://gotwarlost.github.io/istanbul/) helps you find exactly what the lines of code that are tested or not. See an [example output](http://gotwarlost.github.io/istanbul/public/coverage/lcov-report/index.html)
* Use [components](#component) as syntactic spice to help reduce complexity and improve re-usability of code
* Start a server with live reload easily monitoring your progress with ```grunt server```
* Run tests continually when implementing using KarmaJS using ```grunt start```, btw templates are automatically injected to handle mock backend issues.
* Build and minify the project with one command: ```grunt build```
* Intercept calls to an API and provide a [mock API](#api) to do fast prototyping
* And more that needs to be documented..

Maintainer: [Kenneth Lynne](https://github.com/kennethlynne)

Based on [angular-seed](https://github.com/angular/angular-seed/) and [generator-angular](https://github.com/yeoman/generator-angular).

## Usage

Install `generator-angular-xl`:

```
npm install -g generator-angular-xl
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo angular-xl`, optionally passing an app name:
```
yo angular-xl [app-name]
```

## Generators

Available generators:

* [angular-xl](#app) (aka [angular-xl:app](#app))
* [angular-xl:controller](#controller)
* [angular-xl:directive](#directive)
* [angular-xl:component](#component)
* [angular-xl:filter](#filter)
* [angular-xl:route](#route)
* [angular-xl:service](#service)
* [angular-xl:provider](#service)
* [angular-xl:factory](#service)
* [angular-xl:value](#service)
* [angular-xl:constant](#service)
* [angular-xl:decorator] (#decorator)
* [angular-xl:view](#view)

**Note: Generators are to be run from the root directory of your app.**

## Module
Module.js contains the applications main module definition. All dependancies for your application needs to be specified here.

### App
Sets up a new AngularJS app, generating all the boilerplate you need to get started. The app generator also optionally installs Twitter Bootstrap and additional AngularJS modules, such as angular-resource.

Example:
```bash
yo angular-xl
```

### API
This helps out if you need to develop and prototype fast before the API is implemented.
If you have specified that mocks should be used in `app/scripts/config/application-config.js`
```javascript
angular.module('yourModule')
.constant('Config', {
    useMocks:               true,
    viewsDir:               'views/',
    API: {
        protocol:           'http',
        host:               'api.example.com',
        port:               '8080',
        path:               '/api',
        fakeDelay:          2000
    }
})
```
it will automatically intercept all calls to the given API when using ```$http``` or ```$resource```, and reply with data specified in `app/scripts/mock-api.js` after the given delay, when ever you are ready to implement with a real API set ```useMocks: false```

### Route
Routes are specified using the powerful Angular-UIs router instead of the ngRouter one. This helps handle sub-views, stateful urls and other nice stuff.
Routes are configured in `app/scripts/config/routes.js`, for now no generator for routes is implemented and for documentation check out [angular-uis own documentation](https://github.com/angular-ui/ui-router)
This will be improved in the next version.

### Controller
Generates a controller in `app/scripts/controllers` and an accompanying test in `test/spec/controllers`.
Every controller is generated with an accompanying initService, that is responsible for fetching data and returning a promise. This helps you load data *before* the controller is instantiated.

Example:
```bash
yo angular-xl:controller user
```

Produces `app\scripts\controllers\user.js` and `test\spec\controllers\user.js`.

`app\scripts\controllers\user.js`:
```javascript
angular.module('yourModule')
    .service('userCtrlInit', function ($q, $log) {

        var _prepare = function () {
            $log.log("userCtrl loading");

            return $q.all(['Data from service 1', 'Data from service 2']).then(function (data) {
                $log.log("userCtrl loaded!");

                return {
                    message1: data[0],
                    message2: data[1]
                }
            });
        };

        return {
            prepare: _prepare
        }

    })
    .controller('userCtrl', function ($scope, init) {
        $scope.data = init; //Now init.message1 is 'Data from service 1', and init.message2 is 'Data from service 2'
    });
```
This helps keep the code testable (test data fetching separate from controller logic). ```$q.all()``` takes a list of functions, awaits all functions that returns a promise and wraps the returned data in a promise. All services must return successfully before it will resolving the returned promise with the data from the services. Nice.

### Directive
Generates a directive in `app/scripts/directives`.

Example:
```bash
yo angular-xl:directive myDirective
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
A component is basically a element directive that has been pre-bound to use a view located in `app/views/component/<component-name>/<component-name>.html`.
This helps keep complexity low, and makes it easy to separate parts of your application into smaller and more maintainable parts.
Generates a directive in `app/scripts/components` that uses a factory called `componentFactory` for convention over configuration.

Example:
```bash
yo angular-xl:component awesomeUnicorn
```
Produces these files:
`app/scripts/components/awesome-unicorn.js`:
```javascript
angular.module('yourModule.components')
    .controller('awesomeUnicornCtrl', function ($scope, $element) {
        $element.text('this is the awesome unicorn component');
    })
    .component('awesomeUnicorn', function () {
        return {
            controller: 'awesomeUnicornComponentCtrl'
        };
    });
```
`test/spec/components/awesome-unicorn.js`
`app/views/components/awesome-unicorn/awesome-unicorn.html`
```
<div class="awesome-unicorn-component">
    <p>This is the awesome-unicorn component.</p>
</div>
```

Witch in turn lets you specify custom HTML tags like this to invoke a completely self contained component:
```
<awesome-unicorn-component></awesome-unicorn-component>
```

Bonus: The view has specified a component name as a class, helping you avoid CSS collisions. Specify your styles specific for this component in SCSS under a ```.awesome-unicorn-component``` class wrapper, and only this component is targeted. This is an OK approach until shadow DOMs and web components become widely supported.

### Filter
Generates a filter in `app/scripts/filters`.

Example:
```bash
yo angular-xl:filter myFilter
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
yo angular-xl:view user
```

Produces `app/views/user.html`:
```html
<p>This is the user view</p>
```

### Service
Generates an AngularJS service.

Example:
```bash
yo angular-xl:service myService
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
yo angular-xl:decorator serviceName
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
yo angular-xl:service serviceName --skip-add
```

## Bower Components

The following packages are always installed by the [app](#app) generator:

* angular
* angular-mocks
* angular-animate
* angular-scenario
* angular-component-factory
* angular-ui-router
* angular-promise-tracker
* angular-loading-bar
* angular-xeditable

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

## Resources.json
All configuration about what files and in what order the files are supposed to be loaded is spesified in ```resources.json```.
This configuration is shared between both jasmine, minifiers and index.html.

Resource.json contains two sections. One for JS and one for SCSS.
```
"scripts/config/routes.js",
"scripts/**/*.js"
```
Files will be matched only once, so in the aforementioned example the routes config will be loaded before everything else is included.

## Testing

Running `grunt test` will run the unit tests with karma.
Under the folder ```test/coverage``` you will find your whole application structure mapped into matching HTML documents describing how tests cover your code. Use this to your advantage. Crush bugs before they are born.

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a PR, make sure that the commit messages match the [AngularJS conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/).

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
