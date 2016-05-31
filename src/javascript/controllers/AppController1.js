
export default class AppController1{

    constructor($scope, notify, ngDialog) {
//module.exports = function($scope, notify, ngDialog) {
        const self = this;
        self.message = 'Hello';
        self.doSomething = function () {
            self.message = 'Bye';
        };
        self.customer = {
            name: 'Alex',
            address: 'Kanzelstr. 5'
        }
        $scope.callNotify = function (msg) {
            notify(msg);
        };
        $scope.clickToOpen = function () {
            ngDialog.open({template: 'templateID'});
        };

        $scope.test = function () {
            console.log("AaA");
        }
    }

}

AppController1.$inject = ['$scope', 'notify', 'ngDialog'];