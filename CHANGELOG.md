v0.1.12
-------
The bower_components folder has been moved out of the src folder and into the project root

Application source files are installed in src/
You can still use app/ by setting:
  "appPath": "app",
in <your-app>/bower.json and re-running the generator

As much as possible, generated sources adhere to https://github.com/johnpapa/angularjs-styleguide
** ng-annotate is used to add AngularJS dependency injection annotations

Change launch ip to 0.0.0.0 to allow devices(ios/android/etc.) to connect using host machines ip address

Switch to karma-story-reporter

Use appPath to configure mock data injection into tests.

Move Grunt task configurations into separate files under the config directory
** currently unable to copy config files without resorting to hack: "yeoman": "{<%= bugfix %>}"

Added Gruntfile-e2e.js for generating coverage reports with Protractor
