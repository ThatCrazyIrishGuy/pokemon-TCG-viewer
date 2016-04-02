/*

TV SHOW DATA

*/

$.getJSON('dataArray.json', function(json) {
    console.log(json);
    subset = json.slice(0, 12);
    subset.forEach(function(card) {
        var id = card.image.replace(/\W/g, '');
        $('.footer').append(`<div style="background-image: url('${card.image}')" class="box active" id="${id}"></div>`)
        $('<img/>').attr('src', 'card.image').load(function() {
            $(this).remove();
        });
        $("#" + id).click(function() {
            $(".box").removeClass("active");
            $(this).addClass("active");
            $(".bbg").css("background-image", "url(" + card.image + ")");
            $(".bg").css("background-image", "url(" + card.image + ")");
            setTimeout(
                function() {
                    $(".content h1").html(card.name);
                    $(".content h3").html("<table>" +
                        "<tr>" +
                        "<td> " +
                        "<p>" + card.color + "</p>" +
                        "</td>" +
                        "<td>" +
                        "<p>" + card.superType + "</p>" +
                        "</td>" +
                        "<td>" +
                        "<p>" + card.type + "</p>" +
                        "</td>" +
                        "</tr>" +
                        "</table>");
                    $(".content .desc").html(card.abilities[0].text);
                }, 500);
        });
    });
});
/*

HOVERING THING

*/
var array = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
var x = function(a) {
    $(".hover:nth-child(" + a + ")").hover(function() {
        $(".bg").addClass(array[a]);
    }, function() {
        $(".bg").removeClass(array[a]);
    });
}
for (var i = 0; i < 10; i++) {
    x(i);
}
