const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.gameTimes = functions.https.onRequest((request, response) => {

response.send("Get your game on");

var twilio = require('twilio');
var client = new twilio('ACaec97d20fecf1084b7414b90327a2dcf', '96b2edd10737006089771f5da85d2c1c')

const {google} = require('googleapis');
var CLIENT_ID = '';
var API_KEY = 'API_KEY_GOES_HERE'
var CAL_ID = 'akmja0ocng2ggnhndmsibdbtu0@group.calendar.google.com'
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

 var numbers = ['+17203528912', '+13035965242', '+16194144645' ]

 gameInfo = []

function listEvents(auth) {

    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
      calendarId: CAL_ID,
      timeMin: (new Date()).toISOString(),
      maxResults: 1,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        // console.log('Upcoming 10 events:');
        events.map((event, i) => {
          const start = event.start.dateTime.slice([21]) + ' PM'
          const startLong = event.start.dateTime
          const today = (new Date()).toISOString()
   
          if(startLong === today){
            console.log(`Rockies game reminder! ${start} - ${event.summary}`);
            gameInfo.push(`Rockies game reminder! ${start} - ${event.summary}`);
            console.log(gameInfo)

            for (var i = 0; i < numbers.length; i++){
              client.messages.create({ 
                  to: numbers[i], 
                  from:'+17207071210',
                  body: gameInfo},
                  function(err, data){console.log(data.body)
                  }); 
                }
            
          } else {
            for (var i = 0; i < numbers.length; i++){
              client.messages.create({ 
                  to: numbers[i], 
                  from:'+17207071210',
                  body: 'Sorry Rockies fans, no game today!'},
                  function(err, data){console.log(data.body)
                  }); 
                }
          }
         
        });
      } else {
        console.log('No upcoming events found.');
      }

    //     for (var i = 0; i < numbers.length; i++){
    //     client.messages.create({ 
    //         to: numbers[i], 
    //         from:'+17207071210',
    //         body: gameInfo},
    //         function(err, data){console.log(data.body)
    //         }); 
    // }
      // let dater = new Date()
      // console.log(dater)
      // console.log(gameInfo)
    });
  }
  listEvents(API_KEY)
 


});



