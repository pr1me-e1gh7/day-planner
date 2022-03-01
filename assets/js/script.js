// Live clock
window.setInterval(function () {
    $('#clock').html(moment().format('[Current Time: ]YYYY-MM-DD HH:mm:ss'))
}, 1000);

// BUTTONS
// Adds function to Save buttons
$('.btnSave').on('click', function () {
    let textArea = $(this).siblings('textarea').val();
    let rowIndex = $(this).parent().data('index');
    let textValue = textArea;

    localStorage.setItem('row ' + rowIndex, JSON.stringify(textValue));
})
// Adds function to Clear button
$('.btnClear').on('click', function () {
    localStorage.clear();
    location.reload();
})

// PLANNER
// Renders the planner boxes
$(function txtArea() {
    let timeRow = $('.row');
    let timeNow = Number(moment().format('H'));

    timeRow.each(function (i) {
        let timeRowText = $(this).children('textarea');
        let timeRowStore = JSON.parse(localStorage.getItem('row ' + i))

    // Changes box color dependent on time
    if (timeNow === $(this).data('time')) {
        $(this).children('textarea').addClass('timeNow');
        $(this).prevAll().children('textarea').addClass('timeBefore');
        $(this).nextAll().children('textarea').addClass('timeAfter');
    }
    // Checks for saved plans
    if (timeRowStore === null) {
        return;
    }
    // Sets saved plans
        timeRowText.val(timeRowStore);
    });

    // Red if before 8 AM
    if (timeNow < 8) {
        $('.custom-container').find('textarea').addClass('timeAfter');
    // Blue if after 8 PM
    } else if (timeNow > 20) {
        $('.custom-container').find('textarea').addClass('timeBefore');
    }
});