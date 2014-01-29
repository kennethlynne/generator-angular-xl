angular.module('<%= scriptAppName %>')
    .provider('stateFactory', function ($stateProvider, dasherize) {

        this.register = function stateFactory(classedName, params) {

            var _INITSERVICE = classedName + 'CtrlInit';

            var _defaults = {
                url: '/' + dasherize(classedName),
                templateUrl: 'pages/' + dasherize(classedName) + '/index/views/main-view.html',
                controller: classedName + 'Ctrl'
            };

            try {
                _defaults.resolve = {
                    init: ['$injector', function ($injector) {
                        if ($injector.has(_INITSERVICE)) {
                            var service = $injector.get(_INITSERVICE);
                            if (typeof service.prepare !== 'function') throw _INITSERVICE + ' has no prepare method.';

                            return service.prepare();
                        }
                    }]
                }
            }
            catch (e) {
                throw 'Serious error occurred trying to load controller.: ' + e;
            }

            $stateProvider.state(classedName, angular.extend(_defaults, params));
        };

        this.$get = function () {
            return {};
        }
    });