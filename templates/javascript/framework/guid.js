angular.module('<%= scriptAppName %>')
    .value('guid', function guid() {
            function x() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            };
            return x() + x() + '-' + x() + x() + '-' + x() + x() + x() + x();
        });