'use strict';

angular.deepExtend = function (destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor && source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      angular.deepExtend(destination[property], source[property]);
    }
    else {
      destination[property] = source[property];
    }
  }
  return destination;
};