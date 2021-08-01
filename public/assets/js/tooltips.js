// enables hoverable tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    this.addEventListener('hide.bs.tooltip', function () {
        new bootstrap.Tooltip(tooltipTriggerEl)
    })
    return new bootstrap.Tooltip(tooltipTriggerEl)
});