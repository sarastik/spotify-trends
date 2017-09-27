// Scripts for the features.html page

$(function() {

    // Opens and closes accordion
    $(".accordion").click(function() {
        $(this).toggleClass("active");
        var panel = this.nextElementSibling;
        console.log(panel.classList);
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            console.log(panel.style.maxHeight);
            $(".feature-container").children().css("height", "100%");            
        } 
    
        // When accordion closes, set height of images back to auto
        $(this.nextElementSibling).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
            if (!panel.style.maxHeight) {
                $(".feature-container").children().css("height", "auto");         
            }
        });

        //TODO: make other panels close when one opens
    });

});