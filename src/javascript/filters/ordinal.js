

module.exports = function() {
    return function(number) {

        if (number == undefined || number == "") {
            return '';
        }

        else if(isNaN(number) || number < 1) {

            return 'Not a number: ' + number;

        } else {

            var lastDigit = number % 10;

            if(lastDigit === 1) {
                return 'Your number: ' + number + 'st'
            } else if(lastDigit === 2) {
                return 'Your number: ' +number + 'nd'
            } else if (lastDigit === 3) {
                return 'Your number: ' +number + 'rd'
            } else if (lastDigit > 3) {
                return 'Your number: ' +number + 'th'
            }

        }
    }
}