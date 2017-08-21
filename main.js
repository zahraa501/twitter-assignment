var file = require('./fileReader.js');
var userData;
var tweetData;
var accounts = [];
var accountsSorted = [];
var follows = [];
var main = function() {
    //get data from text files
    Promise.all([
        file.fileReader('./files/user.txt'),
        file.fileReader('./files/tweet.txt')
    ]).then(function(response) {
        userData = response[0];
        tweetData = response[1];
        parseUserData(userData);
        displayTweets();
    }).catch(function(error){
    	console.log(error);
    });
};
var parseUserData = function(rawText) {
    //split data on newline character 
    var rawUserData = rawText.split(/\r?\n|\r/g);
    for (var index = 0; index < rawUserData.length; index++) {
        //split account name and follwers
        var accountInformation = rawUserData[index].split('follows');
        //add current user
        addAccount(accountInformation[0].trim(),  accountInformation[1]);
        //create list of accounts mentioned
        var users = accountInformation[1].split(',');
        for (var userIndex = 0; userIndex < users.length; userIndex++) {
            //attempt to add account and followers 
            addAccount(users[userIndex],"");
        }
    }
};
var addAccount = function(username, followsInfo) {
    var accountIndex = accounts.indexOf(username.trim());
    if (accountIndex === -1) {
        //add account to list of accounts
        //updates a list of people the account follows
        accounts.push(username.trim());
        accountsSorted.push(username.trim());
        follows.push([username.trim()]);
        accountIndex = accounts.indexOf(username.trim());
    }
    if (followsInfo !== "") {
    	//update account follows
        follows[accountIndex] = follows[accountIndex].concat(followsInfo.replace(' ', '').split(','));
    }
};
var displayTweets = function() {
	accountsSorted.sort(); 
    for (var index = 0; index < accountsSorted.length; index++) {
        console.log(accountsSorted[index]);
        //send list of accounts the selected account follows
        getUserTweets(follows[accounts.indexOf(accountsSorted[index])]);
    }
};
var getUserTweets = function(users) {
    var tweets = tweetData.split(/\r?\n|\r/g);
    //iterate through all tweets 
    for (var index = 0; index < tweets.length; index++) {
    	//get username of tweet
        var tweetsUser = tweets[index].substring(0, tweets[index].indexOf('>'));
        var tweet = tweets[index].substring(tweets[index].indexOf('>')+2, tweets[index].length);
        //check if user is followed by selected account
        if (users.includes(tweetsUser)) {
            console.log('@' + tweetsUser + ': ' + tweet.substring(0,140));
        }
    }
};

main();