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


    $('#demo1').tagit({
        tagSource: function (request, response) {
            // Need to have alot of logic here to decide what should happen


            //setup the search to search the label
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            // response($.grep(getNextItem(), function (value) {
            //     return matcher.test(value);
            // }));
            var data = getNextItem(request.term);
            console.log(data);
            if(data.responseJSON) {
                response(data.responseJSON)
            } else {
                response(data);
            }
            

        },
        select: true,
        sortable: true,
        allowNewTags: false,
        placeholder: 'What would you like to do?  (Add or Edit)',
        inputWidth: 450,
        tagSelect: function (tag) {
            // logic on selecting tags
            console.log(tag);

            for (item in selectedItems) {
                if (tag.type === item) {
                    
                    selectedItems[item] = tag.label;
                    changePlaceholder(selectedItems);
                }
            }

        },
        onEnter: function (msg) {
            if(checkForNullProp(selectedItems)){
                alert(selectedItems.verb + ' ' + selectedItems.noun + ' for ' + selectedItems.PrimarySearch);
            }
        }
    });
});

var selectedItems = {
    verb: null,
    noun: null,
    PrimarySearch: null
};

function getNextItem(term) {
    if (selectedItems.verb === null) {

        return getVerbs();
    } else if (selectedItems.noun === null) {
        return getNounForVerb(selectedItems.verb)
    } else if (selectedItems.PrimarySearch === null) {
        return getAction(getActionForNoun(selectedItems.noun), term)
    } else {
        return [];
    }
}

function checkForNullProp(items) {
    for(item in items) {
        if(items[item] === null) {
            return false;
        }
    }

    return true;
}

function changePlaceholder(selectedItems) {
    if(selectedItems.verb === null) {
        
        $('#demo1').tagit("adjustPlaceholder", "What would you like to do?  (Add or Edit)");
    } else if (selectedItems.noun === null) {
        $('#demo1').tagit("adjustPlaceholder", "Select what you would like to " + selectedItems.verb +'. (App, Visit, Patient, Claim)');
    } else if (selectedItems.PrimarySearch === null) {
        $('#demo1').tagit("adjustPlaceholder", "Search for the patient by patient name");
    } else {
        $('#demo1').tagit("adjustPlaceholder", "Press Enter to " + selectedItems.verb + " a " + selectedItems.noun);
    }
}