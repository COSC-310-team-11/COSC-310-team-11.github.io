
// CHAT BOT!!!!, maybe

// key listener for the enter key for the text box
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('userInput').addEventListener('keyup', function (event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            whatSaid();
        }
    });
});


//this is what the bot knows
var vocabulary = [
    ['hi', 'hello'],
    ['how are you', 'I am good'],
    ['what is your name', 'I am Cosmo, an Astronaut'],
    ['what is your favorite color', 'I prefer white, like my spacesuit'],
    ['what is space like', 'Extremely cold'],
    ['have you seen an alien', 'Not yet, but I hope I can meet one soon'],
    ['do you like space', 'Space is a beautiful, but lonely place'],
    ['when did you become an astronaut', 'I have been an Astronaut since the first Apollo mission'],
    ['how fast is a space ship', 'Leaving the Earth\'s atmostphere takes a tremendous amount of energy'],
    ['what time is it', 'Time in space is relative to the current time on Earth and distance from Earth'],
    ['where are you', 'In space, but specifically the Andromeda galaxy'],
    ['is it hard to become an astronaut', 'Becoming an Astronaut requires lots of physical training, as well as a lot of education'],
    ['can regular people travel to space', 'In time, everyone will be able to travel through space'],
    ['what do you do in space', 'On a daily basis, I check the equipment on the spaceship, and perform tests on items from space'],
    ['what do you eat', 'Food in space is usually freeze dried and nutrient heavy blocks. Astronauts can also request things like Pizza and Ice Cream'],
    ['when are you coming back', 'Usually, I spend between 1-3 years in space before coming back to Earth. Resource limitations are the main reason why I need to return.'],
    ['how long have you been there', 'Currently I have spent a total of 40 years in space'],
    ['where do you live', 'Each Astronaut on this ship has a room that they can stay in'],
    ['what is your favorite food', 'On Earth, Carbonara, but in space, Beef Stew'],
    ['what is your hobby', 'I like to pass my time by drawing my surroundings in a notebook'],
    ['how old are you', 'I am 65 years old'],
    ['how far are you', 'From Earth, I am 2.537 Million light years away'],
    ['what is your favorite star', 'The Pleiades is my favorite'],
    ['tell me more about the pleiades', 'It is a cluster of 7 stars known as The Seven Sisters'],
    ['where is pleiades', 'The Pleiades cluster is about 444 light years away from Earth'],
    ['have you seen a black hole', 'Not in person, and I am not sure of what the outcome would be if that was the case'],
    ['is space scary', 'Space can be terrifying at times, due to the isolation and unkown aspects'],
    ['goodbye', 'Thank you for spending time with me'],
    ['have a nice day', 'Enjoy the rest of yours'],
    ['see you later', 'Another time then']
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



