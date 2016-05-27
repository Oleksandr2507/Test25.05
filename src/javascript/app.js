


var greetings = require('./modules/greetings.js');
console.log(greetings('Christophe'));

var moment = require('moment');
console.log(moment());

var _ = require('underscore');

_([1,2,3]).map(function(x) {
    console.log(x+1);
});

var items = [1,2,3,4];
console.log([...items]);

var module1 = require('./modules/customModule1.js');
console.log(module1.funct(5));

var multiply = require('./modules/multiply.js');
console.log(multiply(2, 0));

$("#asdf").hide();