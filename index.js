$.getJSON('dataArray.json', function(json) {
    console.log(json);
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
        $(`<div style="background-image: url('${card.image}')" class="box active" id="${id}"></div>`).hide().appendTo(".footer").fadeIn(500);;
        $("#" + id).click(function() {
            $('.padding').children('.desc').remove();
            $(".box").removeClass("active");
            $(this).addClass("active");
            $(".bbg").css("background-image", "url(" + card.image + ")");
            $(".bg").css("background-image", "url(" + card.image + ")");
            setTimeout(
                function() {
                    $(".content h2").html(card.name);
                    $(".content h3").html("<table>" +
                        "<tr>" +
                        "<td> " +
                        "<i class='energy icon-"+ card.color +"' title='"+ card.color +"' ></i>" +
                        "</td>" +
                        "<td>" +
                        "<p>" + card.superType + "</p>" +
                        "</td>" +
                        "<td>" +
                        "<p>" + card.type + "</p>" +
                        "</td>" +
                        "</tr>");
                    var html = '';
                    card.abilities.forEach(function(ability){
                        html += `<tr class="name"><td>${ability.name}</td><td>${ability.damage}</td></tr>`;
                        html += '<tr><td class="detail"><p class="desc">'+ ability.text +'</br></p></td>';
                        ability.cost.forEach(function(eCost){
                            html += `<td class="detail"><i title="${eCost}" class="in-table energy icon-${eCost}"</i></td>`;
                        });
                        html += '</tr>';
                    });
                    html+= "</table>";
                    $(".content h3").append(html);
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