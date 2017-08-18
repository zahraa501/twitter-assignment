var file = require('./fileReader.js');
var userData;
var tweetData;
var accountList;

var main = function() {
    //get data from text files
    Promise.all([
        file.fileReader('./files/user.txt'),
        file.fileReader('./files/tweet.txt')
    ]).then(function(response) {
        userData = response[0];
        tweetData = response[1];
        accountList = getAccountsList(userData);
        displayTweets();
    });
};
var print = function(text) {
    console.log(text);
};
//user data 
var getAccountsList = function(rawText) {
    var accounts = [];
    var usersRaw = rawText.replace(/\r?\n|\r/g, ' ').replace(/,/g, '').replace(/follows /g, "").split(' ');
    for (var index = 0; index < usersRaw.length; index++) {
        if (!accounts.includes(usersRaw[index])) {
            accounts.push(usersRaw[index]);
        }
    }
    return accounts.sort();
};
var getAccountsFollowed = function(user) {
    var follows = [user];
    var usersRaw = userData.split(/\r?\n|\r/g);
    for (var index = 0; index < usersRaw.length; index++) {
        var data = usersRaw[index].split('follows');
        if (user.trim() === data[0].trim()) {
            var users = data[1].split(',');
            for (var userIndex = 0; userIndex < users.length; userIndex++) {
                if (!follows.includes(users[userIndex])) {
                    follows.push(users[userIndex].trim());
                }
            }
        }
    }
    return follows;
};
var getUserTweets = function(users) {
    var tweets = tweetData.split(/\r?\n|\r/g);
    for (var index = 0; index < tweets.length; index++) {
        var tweetsUser = tweets[index].substring(0, tweets[index].indexOf('>'));
        var tweet = tweets[index].substring(tweets[index].indexOf('>')+2, tweets[index].length);
        if (users.includes(tweetsUser)) {
            print('@' + tweetsUser + ': ' + tweet);
        }
    }
};
var displayTweets = function() {
    for (var index = 0; index < accountList.length; index++) {
        print(accountList[index])
        getUserTweets(getAccountsFollowed(accountList[index]));
    }
};

main();