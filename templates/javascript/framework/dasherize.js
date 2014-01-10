angular.module('<%= scriptAppName %>')
    .constant('dasherize', function (input) {
        return input
            .replace(/(?:^[A-Z]{2,})/g, function (match) { //XMLfileIsCool -> xml-fileIsCool
                return match.toLowerCase() + "-";
            })
            .replace(/(?:[A-Z]+)/g, function (match) { //camelCase -> snake-case
                return "-" + match.toLowerCase();
            })
            .replace(/^-/, ''); // CamelCase -> -snake-case -> snake-case
    });