$(function () {

    var availableTags = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme"
    ];

    var tagTest = [
        {
            label: 'ActionScript',
            value: 'ActionScript',
            id: 1
        },
        {
            label: 'Javascript',
            value: 'Javascript',
            id: 2
        }
    ];

    var selectSomething = {
        verb: null,
    };
    $('#demo1').tagit({
        tagSource: function (request, response) {
            //setup the search to search the label
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response($.grep(tagTest, function (value) {
                return matcher.test(value.label);
            }));
        },
        select: true,
        sortable: true,
        allowNewTags: false
    });
});