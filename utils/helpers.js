module.exports = {
    format_date: date => {
        if (date) {
            return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
        }
        return "No Date"
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
        return word;
    },
    checkMilestoneStatus: function(status, options) {
        switch (status) {
            case "To Do":
                return ('<i class="fas fa-list-ul" style="font-size:35px"></i>');
            case "In Progress":
                return ('<i class="fas fa-tasks text-success" style="font-size:35px"></i>');
            case "Complete":
                return ('<i class="fas fa-medal fa-4x text-primary" style="font-size:35px"></i>');
        }
    },
    getDaysDifference: function(startDate, endDate) {
        // Format Dates
        const date1 = new Date(startDate);
        const date2 = new Date(endDate);

        // Conversion for JS Dates from milliseconds to Days
        const oneDay = 1000 * 60 * 60 * 24

        // Find difference between two dates
        const diff = date2.getTime() - date1.getTime();

        // Apply oneDay Conversion
        const daysDifference = Math.round(diff / oneDay);
        return daysDifference
    },

}