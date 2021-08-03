module.exports = {
    format_date: date => {
        if(date) {
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
    checkMilestoneStatus: function(milestone, options) {
        switch (milestone.status) {
            case "To Do":
                return ('<i class="fas fa-list-ul" id="icon"></i>');
            case "In Progress":
                return ('<i class="fas fa-check text-success" id="icon"></i>');
            case "Complete":
                return ('<i class="fas fa-medal fa-4x text-primary" id="icon"></i>');
        }
    }
}