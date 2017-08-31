function main(){
    $(".title").hide().fadeIn(1000).delay(3500).fadeOut(1000);

    $(".caption").hide().delay(500).fadeIn(1000).delay(2500).fadeOut(1000);
    $(".overlay").delay(6000).fadeOut(200)
    $(".screen").delay(6000).animate({
        left: "+=100%",
    },500);
}

$(document).ready(main());