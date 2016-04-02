$.getJSON('dataArray.json', function(json) {
    $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: 'cards',
        source: substringMatcher(json)
    }).on('typeahead:selected typeahead:autocompleted', function(e, datum) {
        var searchString = $('#search').val();
        subset = json.filter(function(card) {
            if (card.name == searchString) return card;
        });
        subset = subset.slice(0, 12);
        displayCards(subset);
        $('.footer > div:first').delay(250).trigger('click');
    });
    subset = json.slice(0, 12);
    displayCards(subset)
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

function displayCards(cards) {
    $('.footer').empty();
    cards.forEach(function(card) {
        var id = card.image.replace(/\W/g, '');
        $('.footer').append(`<div style="background-image: url('${card.image}')" class="box active" id="${id}"></div>`)
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
}

var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;
        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function(i, str) {
            if (substrRegex.test(str.name) && matches.indexOf(str.name) < 0) {

                matches.push(str.name);
            }
        });
        cb(matches);
    };
};
