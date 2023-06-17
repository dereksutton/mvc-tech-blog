module.exports = {
    format_date(date) {
        // Format the date as MM/DD/YYYY
        return date.toLocaleDateString();
    },
    format_amount(amount) {
        // Format large numbers to include commas
        return parseInt(amount).toLocaleString();
    },
};