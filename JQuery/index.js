

// $("h1").on("mouseover", function() {
//     $("h1").css("color", "purple");
// });

// $("h1").on("mouseout", function() {
//     $("h1").css("color", "black");
// });

$("button").on("click", function() {
    // $("h1").animate({
    //     opacity: 0.5
    // });
    // $("h1").slideUp().slideDown().animate({opacity: 0.5});

    $("h1").delay(1000).slideUp().slideDown().animate({opacity: 0.5});
});
