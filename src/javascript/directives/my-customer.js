module.exports = function() {
    return {
        controller: 'AppController1',
        link: function(scope, element, attrs, ctrl) {},
        template: 'Name: {{ctrl.customer.name}} Address: {{ctrl.customer.address}}'
    }
}