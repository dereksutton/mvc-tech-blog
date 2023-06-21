const Handlebars = require('handlebars');

module.exports = {
    format_date(date) {
        // Format the date as MM/DD/YYYY
        return date.toLocaleDateString();
    },
    format_amount(amount) {
        // Format large numbers to include commas
        return parseInt(amount).toLocaleString();
    },
    if_eq(a, b, options) {
        // Compare two values and render the block if they are equal
        if (a == b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    n12br(text) {
        text = Handlebars.Utils.escapeExpression(text);
        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
        return new Handlebars.SafeString(text);
    }
};