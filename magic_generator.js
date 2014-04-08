// Initial Object, more details set in datapack file
var artificer = {adjective:[""], item:[""], origin:[""], quirk:[""], power:[""]};

// Build a phrase from the random sets.
artificer.build_power_phrase = function() {

    // Take in one of the five lists above, return a single random element.
    function randomPhrase(wordList) {
        var length = wordList.length;
        var random = Math.floor(Math.random() * length);
        return wordList[random];
    }

    // For quirks and powers, remove them when used so they don't repeat.
    var randomQuirk = artificer.quirk.splice( $.inArray(randomPhrase(artificer.quirk), artificer.quirk), 1);
    var randomPower = artificer.power.splice( $.inArray(randomPhrase(artificer.power), artificer.power), 1);

    var phrase_adj = randomPhrase(artificer.adjective);
    var phrase_origin = randomPhrase(artificer.origin);
    var phrase_item = randomPhrase(artificer.item);

    return phrase_adj.concat(" ", phrase_origin, " ", phrase_item, " that ", randomPower, " and ", randomQuirk);
};


artificer.show_all_items = function() {
    // Generate HTML ordered lists based on the original lists.
    function numberedList(list) {
        return "<ol><li>"+list.join("</li><li>")+"</li></ol>";
    }

    artificer.generate_item_list();

    // Jquery selectors to display them on the page
    $("div#itemlist").html(numberedList(artificer.randomItems));
    $("div#adjectives").html(numberedList(artificer.adjective));
    $("div#origins").html(numberedList(artificer.origin));
    $("div#items").html(numberedList(artificer.item));
    $("div#powers").html(numberedList(artificer.power));
    $("div#quirks").html(numberedList(artificer.quirk));
};
artificer.generate_item_list = function() {
    //Copy the original quirk list to be reused later
    artificer.quirks = artificer.quirk.slice(0);
    artificer.powers = artificer.power.slice(0);

    // Generate 100 random items in a big string
    var randomItemsList = [];
    for (var i=1;i<=100;i++) {
        randomItemsList.push(artificer.build_power_phrase());
    }
    artificer.randomItems = randomItemsList;

    artificer.quirk = artificer.quirks.slice(0);
    artificer.power = artificer.powers.slice(0);
};

$(document).ready(function() {
    artificer.show_all_items();
    $("#artificer_title")
        .bind("click",artificer.show_all_items);
});