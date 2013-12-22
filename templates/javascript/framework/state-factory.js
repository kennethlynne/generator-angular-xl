angular.module('<%= scriptAppName %>')
    .provider('stateFactory', function (pageViewDirectoryFactory, $injector) {
        this.$get = function () {
            return function stateFactory(classedName, params) {

                var _INITSERVICE = classedName + 'CtrlInit';

                function camelize(input) {
                    return input
                        .replace(/(?:[A-Z]+)/g, function (match) { //camelCase -> snake-case
                            return "-" + match.toLowerCase();
                        })
                        .replace(/^-/, ''); // CamelCase -> -snake-case -> snake-case
                };

                var _defaults = {
                    url: '/' + camelize(classedName) ,
                    templateUrl: pageViewDirectoryFactory( camelize(classedName) ),
                    controller: classedName + 'Ctrl'
                };

                try
                {
                    _defaults.resolve = {
                        init: ['$injector', function ($injector) {
                            if($injector.has(_INITSERVICE))
                            {
                                var service = $injector.get(_INITSERVICE);
                                if(typeof service.prepare !== 'function') throw _INITSERVICE + ' has no prepare method.';

                                return service.prepare();
                            }
                            else
                            {
                                throw 'Serious error occurred trying to load controller. No such service: ' + _INITSERVICE;
                            }
                        }]
                    }
                }
                catch(e)
                {
                    throw 'Serious error occurred trying to load controller.: ' + e;
                }

                return angular.extend(_defaults, params);
            }
        }
    });