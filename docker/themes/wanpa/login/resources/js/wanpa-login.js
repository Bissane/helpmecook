$(function() {
    var $formControl = $('.form-control');

    $formControl.each(function (i) {
        var $this = $(this);
        var label = $("label[for='" + $this.attr('id') + "']");
        if ($this.val()) {
            label.addClass('used');
        } else {
            label.removeClass('used');
        }
    });

    $formControl.blur(function() {
        var $this = $(this);
        var label = $("label[for='" + $this.attr('id') + "']");
        if ($this.val()) {
            label.addClass('used');
        } else {
            label.removeClass('used');
        }
    });
});