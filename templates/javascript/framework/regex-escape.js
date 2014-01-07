angular.module('<%= scriptAppName %>')
    .constant('regexEscape', function regEsc(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    });