var firebase = require('firebase-admin');
firebase.initializeApp({
  credential: firebase.credential.cert({
    "private_key": process.env.KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.EMAIL
  }),
  databaseURL: 'https://season-now.firebaseio.com'
});
var databaseReference = firebase.database().ref().child('interests');

var listOfInterests = [];

var express = require('express');
var app = express();
app.set('view engine', 'pug');

app.use(express.static('static'));

app.get('/c/:newInterest', (req,res) => {
  console.log('New interest received:',req.params.newInterest);
});

app.get('/', function(req,res){
    console.log('route "/" hit');
    databaseReference.once("value",snapshot => {
      console.log('db got values');
      snapshot.forEach(child => {
        console.log('pushing value', child.val());
        listOfInterests.push(child.val());
      });
    });
    res.render('index', { interests:listOfInterests });
});


app.listen(process.env.PORT, function () {
  console.log('Needo listening on port '+ process.env.PORT);
});