Assignment

Please write a program to simulate a twitter-like feed. Your program will receive two seven-bit ASCII files. The first file contains a list of users and their followers. The second file contains tweets. Given the users, followers and tweets, the objective is to display a simulated twitter feed for each user to the console. 
 The program should be well designed, handle errors and should be of sufficient quality to run on a production system. Indicate all assumptions made in completing the assignment.
 Each line of a well-formed user file contains a user, followed by the word 'follows' and then a comma separated list of users they follow.  Where there is more than one entry for a user,  consider the union of all these entries to determine the users they follow.
 Lines of the tweet file contain a user, followed by greater than, space and then a tweet that may be at most 140 characters in length. The tweets are considered to be posted by the each user in the order they are found in this file.
 Your program needs to write console output as follows. For each user / follower (in alphabetical order) output their name on a line. Then for each tweet, emit a line with the following format: <tab>@user: <space>message.
 Here is an example. Given user file named user.txt:
Ward follows Alan
Alan follows Martin
Ward follows Martin, Alan
 And given tweet file named tweet.txt:
Alan> If you have a procedure with 10 parameters, you probably missed some.
Ward> There are only two hard things in Computer Science: cache invalidation, naming things and off-by-1 errors.
Alan> Random numbers should not be generated with a method chosen at random.
 So invoking your program with user.txt and tweet.txt as arguments should produce the following console output:
Alan
@Alan: If you have a procedure with 10 parameters, you probably missed some.
@Alan: Random numbers should not be generated with a method chosen at random.
Martin
Ward
@Alan: If you have a procedure with 10 parameters, you probably missed some.
@Ward: There are only two hard things in Computer Science: cache invalidation, naming things and off-by-1 errors.
@Alan: Random numbers should not be generated with a method chosen at random.
We look forward to hearing from you!

My thoughts or assumptions, while solving the problem:
- A compromise needs to be made between computing time and memory used. This problem specifically arises when you have to extract data from the user file and have to create a list of unique users, sort that user list and create a list of accounts that the user follows. In this case I have placed a higher importance on the amount of time taken to compute the solution because of client experience  (i.e. waiting a long time for tweets to load). The trade off does however mean that there would be a limit to the amount of accounts a user can follow. 
- A compromise needs to be made when displaying tweets. The reason for this is because the worst case scenario would be that all tweets in a text file are relevant to a specific user. The impact would be that a user would have to wait until an entire text file is looped through and, depending on the amount of tweets that exist, this could mean a long waiting period. The real Twitter has solved this specific problem by implementing a cap on the amount of tweets retrieved and rendered at a time. In this case I would also implement a cap but because of the small data set, I do not know what the optimal cap would be.
- The entire program is dependent on the format of the text file and therefore will not work as intended if it does not adhere to it.

Command to run code: node main.js

Version of Node used - V8.3
