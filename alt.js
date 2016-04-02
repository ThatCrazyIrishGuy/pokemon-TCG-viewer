$(".bbg").css("background-image", "url(https://41.media.tumblr.com/7e7310f34f0ddadb741110eae34e1ff9/tumblr_n3437fwTKw1qhgmgto1_1280.jpg)");

$.getJSON('dataArray.json', function(json) {
    console.log(json);
    var counter = 1;
    var timeouts = [];
    $('.typeahead').typeahead({
        hint: false,
        highlight: true,
        minLength: 1
    }, {
        name: 'cards',
        source: substringMatcher(json)
    }).on('typeahead:selected typeahead:autocompleted', function(e, datum) {
        for (var i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        $('img').remove();
        timeouts = [];
        counter = 1;
        var searchString = $('#search').val();
        json.forEach(function(card) {
            if (card.name == searchString) {
                timeouts.push(setTimeout(function() {
                    $.ajax({
                        url: card.image,
                        cache: true,
                        processData: false,
                    }).success(function() {
                        $('center').append(`<img src=${card.image} id="${card.name}" style="float:left;width:calc(100% / 9)"></img>`).fadeIn();
                    });
                }, counter * 100));
                counter++;
            }
        });
    });
    json.forEach(function(card) {
        timeouts.push(setTimeout(function() {
            $.ajax({
                url: card.image,
                cache: true,
                processData: false,
            }).success(function() {
                $('center').append(`<img src=${card.image} id="${card.name}" style="float:left;width:calc(100% / 9)"></img>`).fadeIn();
            });
        }, counter * 100));
        counter++;
    });
});

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
