//Source: http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
//TODO: Move into separate file
angular.deepExtend = function(destination, source) {
    for (var property in source) {
        if (source[property] && source[property].constructor && source[property].constructor === Object)
        {
            destination[property] = destination[property] || {};
            angular.deepExtend(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
};

angular.module('<%= scriptAppName %>')
    .constant('Config', angular.deepExtend({
        viewsDir:               'views/',
        componentsDir:          'components/',
        pagesDir:               'pages/',
        environment:            'production', //development or production
        API: {
            protocol:           window.location.protocol.split(':')[0], //Use the same protocol, host and port as the UI is hosted from bu default
            host:               window.location.hostname,
            port:               String(window.location.port || 80),
            path:               '/api'
        }
    }, angular._localConfig || {}))
    .config(function (componentFactoryProvider) { componentFactoryProvider.setViewPath(function (componentSnakeName, componentName) {
        return 'components/' + componentSnakeName + '/' + componentSnakeName + '.html';
    })})
    .value('cgBusyTemplateName','views/angular-busy/default-spinner.html')
    .factory('BaseUrl', function (Config) {
        return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + '/');
    })
    .factory('APIBaseUrl', function (Config) {
        return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + Config.API.path + '/');
    })<% if (xeditableModule) { %>
    .run(function(editableOptions) {editableOptions.theme = 'bs3'})<% } %>;




