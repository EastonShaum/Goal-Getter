// Logic that enables dynamic progress bars dependent on completed vs total
const progressLoadMygoals = () => {
    $('.card-progress').each(function() {
        let completed = parseInt($(this).attr('data-completed'));
        let total = parseInt($(this).attr('data-total'));
        if (completed === 0) {
            $(this).attr('style', 'width: 0%');
        } else if (completed === total) {
            $(this).attr('style', 'width: 100%');
        } else {
            let percentage = Math.floor((completed/total)*100);
            $(this).attr('style', `width: ${percentage}%`);
        }
    });
}

const progressLoadSingleGoal = () => {
    let completed = parseInt($('.single-progress').attr('data-completed'));
    let total = parseInt($('.single-progress').attr('data-total'));
    if (completed === 0) {
        $('.single-progress').attr('style', 'width: 0%').html('0%');
    } else if (completed === total) {
        $('.single-progress').attr('style', 'width: 100%').html('100%');
    } else {
        let percentage = Math.floor((completed/total)*100);
        $('.single-progress').attr('style', `width: ${percentage}%`).html(`${percentage}%`);
    }
}

progressLoadMygoals();
progressLoadSingleGoal();