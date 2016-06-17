var json = {
    verbs: [
        {
            label: 'Add',
            type: 'verb',
            id: 1
        }, {
            label: 'Edit',
            type: 'verb',
            id: 2
        }
    ],
    nouns: [
        {
            label: 'Appointment',
            type: 'noun',
            verbs: ['Add', 'Edit'],
            id: 3,
            action: 'PrimarySearch'
        }, {
            label: 'Visit',
            type: 'noun',
            verbs: ['Add', 'Edit'],
            id: 4,
            action: 'PrimarySearch'
        }, {
            label: 'Claim',
            type: 'noun',
            verbs: ['Edit'],
            id: 5,
            action: 'PrimarySearch'
        }, {
            label: 'Patient',
            type: 'noun',
            verbs: ['Add', 'Edit'],
            id: 6,
            action: 'open'
        }
    ],
    actions:
    {
        open: function (noun) {
            return 'new patient';
        },
        PrimarySearch: function () {
            return {
                label: 'Patient',
                type: 'PrimarySearch',
                secondaryTerms: null
            };
        },
        SecondaryTerms: null
    }

};


function getVerbs() {
    return json.verbs.map(getLabels);
}

function getLabels(item, index) {
    return item.label;
}

function getNounForVerb(verb) {
    return json.nouns.filter(function (item, index) {
        if ($.inArray(verb, item.verbs) > -1) {
            return item;
        }
    }).map(getLabels);
}

function getAllLabels() {
    var labels = []
    for (item in json) {
        labels = $.merge(labels, json[item].map(getLabels));
    }
    return labels;
}

function getActionForNoun(noun) {
    return json.nouns.filter(function (item, index) {
        if(item.label === noun){
            return item;
        }
    }).map(function(item, index) {
        return item.action;
    })
}

function getAction(action) {
    return json.actions[action]();
}

var selection = ['Add', 'Patient'];

function getNextSelection(selection) {
    if (selection.length < 1) {
        return getVerbs();
    } else if (selection.length === 1) {
        return getNounForVerb(selection[0]);
    } else if (selection.length === 2) {
        return getAction(getActionForNoun(selection[1]));
    }
}