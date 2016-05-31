

require('babel-polyfill');

import controllers from './angular-modules/controllers-module';

const app = angular.module('DemoApp', 'dialog.templates', ['ngRoute', 'ngAnimate', 'ngMessages', 'ngDialog', 'controllers']),

    AppController1 = require('./controllers/AppController1.js'),

    myCustomer = require('./directives/my-customer.js'),

    ordinal = require('./filters/ordinal.js'),

    notify = require('./services/notify.js');

app.controller('AppController1', ['$scope', 'notify', 'ngDialog', AppController1])

    .directive('myCustomer', myCustomer)

    .filter('ordinal', ordinal)

    .factory('notify', ['$window', notify]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{templateUrl:'assets/views/main.html'})
        .when('/controller', {
            template:'This is the computers Route. And the message is {{ctrl.message}}',
            controller: 'AppController1 as ctrl'})
        .when('/animation', {templateUrl:'assets/views/animate.html'})
        .when('/message', {templateUrl: 'assets/views/message.html'})
        .when('/directive', {
            templateUrl: 'assets/views/directive.html',
            controller: 'AppController1 as ctrl'})
        .when('/filter', {templateUrl: 'assets/views/filter.html'})
        .when('/service', {templateUrl: 'assets/views/service.html'})
        .when('/dialog', {templateUrl: 'assets/views/dialog.html'})
        .otherwise({redirectTo:'/'});
    }]);








/*app.controller('AppController1', [function() {
 var self = this;
 self.message= 'Hello';
 self.doSomething = function() {
 self.message = 'Bye';
 };
 }]);*/

/*var greetings = require('./modules/greetings.js');
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
console.log(multiply(2, 0));*/
