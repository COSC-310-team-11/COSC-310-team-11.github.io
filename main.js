
// CHAT BOT!!!!, maybe

// key listener for the enter key for the text box
document.getElementById('userInput').addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        whatSaid();
    }
});


//this is what the bot knows
var vocabulary = [
    ['hi', 'hello'],
    ['how are you', 'I am good'],
    ['what is your name', 'I am a bot'],
    ['what is your favorite color', 'I like blue']
];


function bestMatch(str1) {
    var bestMatch = 0;
    var bestMatchnum = 0;
    for (var i = 0; i < vocabulary.length; i++) {
        var splitString = vocabulary[i][0].split(' ');
        var wordsMatched = 0;
        for (var j = 0; j < splitString.length; j++) {
            if (str1.includes(splitString[j]))
                wordsMatched++;
        }
        if (wordsMatched > bestMatchnum) {
            bestMatchnum = wordsMatched;
            bestMatch = i;
        }
    }
    return bestMatch;
}

function whatSaid() {
    var input = document.getElementById('userInput');
    var userInput = input.value.toLowerCase();

    //this strips the punctuation and the spaces from user input
    var punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;

    //convert to lower case | remove punctuation | remove spaces
    var userInput = userInput.replace(punctRE, '').replace(/\s+/g, ' ').toLowerCase()

    var bestmatching = bestMatch(userInput);


    var respo = vocabulary[bestmatching][1];
    document.getElementById('botRespo').innerHTML = respo;

    // var dist = levenshteinDistance(vocabulary[i][0], userInput);
}

// Levenshtein Distance (Takes differences between 2 strings and returns the number of differences) 
// Known algrothim
const levenshteinDistance = (str1 = '', str2 = '') => {
    const track = Array(str2.length + 1).fill(null).map(() =>
        Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
        track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
        track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
        for (let i = 1; i <= str1.length; i += 1) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1, // deletion
                track[j - 1][i] + 1, // insertion
                track[j - 1][i - 1] + indicator, // substitution
            );
        }
    }
    return track[str2.length][str1.length];
};



