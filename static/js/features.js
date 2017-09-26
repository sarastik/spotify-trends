// Scripts for the features.html page

$(function() {

    $(".accordion").click(function() {
        $(this).toggleClass("active");
        var panel = this.nextElementSibling;
        console.log(panel.classList);
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            console.log(panel.style.maxHeight);
        } 
        //TODO: make other panels close when one opens
    });

});