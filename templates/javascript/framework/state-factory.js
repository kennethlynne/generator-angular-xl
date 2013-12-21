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
                        init: function ($injector, $log) {
                            if($injector.has(_INITSERVICE))
                            {
                                return $injector.get(_INITSERVICE).prepare();
                            }
                            else
                            {
                                $log.error('Serious error occurred trying to load controller. Error trying to initialize ' + _INITSERVICE);
                            }
                        }
                    }
                }
                catch(e)
                {
                    console.error('Serious error occurred trying to load controller.', e);
                }

                return angular.extend(_defaults, params);
            }
        }
    });