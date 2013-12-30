# generator-angular-xl [[![Build Status](https://travis-ci.org/kennethlynne/generator-angular-xl.png?branch=master)](https://travis-ci.org/kennethlynne/generator-angular-xl)](https://travis-ci.org/kennethlynne/generator-angular-xl) [![Code Climate](https://codeclimate.com/repos/52c126c26956804e75002b01/badges/a6c7dad12fca54e9f2a0/gpa.png)](https://codeclimate.com/repos/52c126c26956804e75002b01/feed) [![Ready](https://badge.waffle.io/kennethlynne/generator-angular-xl.png?label=ready)](https://waffle.io/kennethlynne/generator-angular-xl)


Automate your workflow when implementing large scale AngularJS applications. Avoid boilerplate and improve productivity.
This generator and framework is a seed and basic framework for developing AngularJS applications.
Stay in the zone, spend more time flowing and less time doing the boring stuff.

To sum up:
* All scripts in `app/scrips`, `app/components` and `app/pages` and styles in `app/styles` will be automatically included in minifiers, index.html and tests. Specify configuration once and share it between *all the things*. Need more control? Check out [resources.json](#resources.json).
* Controllers, views and styling for components and pages are grouped together to facilitate reuse and order.
* Test coverage using [Istanbul](http://gotwarlost.github.io/istanbul/) helps you find exactly what the lines of code that are tested or not. See an [example output](http://gotwarlost.github.io/istanbul/public/coverage/lcov-report/index.html)
* Use [components](#component) as syntactic sugar to help reduce complexity and improve re-usability of code
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
* [angular-xl:page](#page)
* [angular-xl:service](#service)
* [angular-xl:provider](#service)
* [angular-xl:factory](#service)
* [angular-xl:value](#service)
* [angular-xl:constant](#service)
* [angular-xl:decorator] (#decorator)
* [angular-xl:view](#view)

**Note: Generators are to be run from the root directory of your app.**

### Module
`app/scripts/module.js` contains the applications main module definition. All dependancies for your application needs to be specified here.

### App
Sets up a new AngularJS app, generating all the boilerplate you need to get started. The app generator also installs Twitter Bootstrap and additional AngularJS modules.

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

### Page
Pages are located under `app/pages`. A page basically is a controller, with a view and page specific styling. Routes are specified using the powerful Angular-UI Route API in the config section in the controller.

Example:
```bash
yo angular-xl:page user
```

Produces `app/pages/user/index/user.js`, `test/spec/pages/user/index/user.js`, `app/pages/user/index/views/user.html` and `app/pages/user/styles/_user.scss`

### Routing
Routes are configured in `app/scripts/config/routes.js`. Each individual controller registers its own route.

### Controller
Generates a controller in `app/pages` and an accompanying test in `test/spec/pages`.
Every controller is generated with an accompanying initService, that is responsible for fetching data and returning a promise. This helps you load data *before* the controller is instantiated.

Example:
```bash
yo angular-xl:controller user
```

Produces `app/scripts/controllers/user.js` and `test/spec/controllers/user.js`.

`app/scripts/controllers/user.js`:
```javascript
angular.module('yourModule')
    .config(function ($stateProvider, stateFactoryProvider) { $stateProvider.state('User', stateFactoryProvider.$get()('User')) })
    .service('UserCtrlInit', function ($q, $log) {

        var _prepare = function () {
            $log.log("UserCtrl loading");

            return $q.all(['Data from service 1', 'Data from service 2']).then(function (data) {
                $log.log("UserCtrl loaded!");

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
    .controller('UserCtrl', function ($scope, init) {
        $scope.data = init; //Now init.message1 is 'Data from service 1', and init.message2 is 'Data from service 2'
    });
```
This helps keep the code testable (test data fetching separate from controller logic and easily inject mock data in tests). ```$q.all()``` takes a list of functions, awaits all functions that returns a promise and wraps the returned data in a promise. All services must return successfully before it will resolve the returned promise with the data from the services. Nice.

### Directive
Generates a directive in `app/scripts/directives`.

Example:
```bash
yo angular-xl:directive myDirective
```

Produces `app/scripts/directives/my-directive.js`:
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
`app/styles/components/awesome-unicorn/_awesome-unicorn.scss` (and adds an import statement to it in `app/styles/_components.scss`)
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

The view has specified a component name as a class, helping you avoid CSS collisions. Specify your styles specific for this component in SCSS under a ```.awesome-unicorn-component``` class wrapper, and only this component is targeted. This is an OK approach until shadow DOMs and web components become widely supported.

### Filter
Generates a filter in `app/scripts/filters`.

Example:
```bash
yo angular-xl:filter myFilter
```

Produces `app/scripts/filters/my-filter.js`:
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

Produces `app/scripts/services/my-service.js`:
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

Produces `app/scripts/decorators/servicename-decorator.js`:
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
When you install new dependancies you have to add a reference to the script files in `resources.json` under ```external```. The build task will inject this into `index.html` during runtime, and when you build the project it will by convention use the minified version of the source file, that should be located in the same folder, with the exact same filename with a `.min` suffix. This will be concatenated without minification.

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
All configuration about what files and in what order the files are supposed to be loaded is specified in ```resources.json```.
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
