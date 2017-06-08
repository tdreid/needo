var firebase = require('firebase-admin');
firebase.initializeApp({
  credential: firebase.credential.cert({
    "private_key": process.env.KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.EMAIL
  }),
  databaseURL: 'https://season-now.firebaseio.com'
});
var databaseReference = firebase.database().ref().child('interests');

var express = require('express');
var app = express();
app.set('view engine', 'pug');

app.use(express.static('static'));

app.get('/c/:newInterest', (req,res) => {
   databaseReference.push(req.params.newInterest);
   res.send(JSON.stringify(req.params.newInterest));
});

app.get('/', function(req,res){
    databaseReference.once("value",snapshot => {
      var listOfInterests = [];
      snapshot.forEach(child => {
        listOfInterests.push(child.val());
      });
      res.render('index', { interests:listOfInterests });
    });
});

app.listen(process.env.PORT, function () {
  console.log('Needo listening on port '+ process.env.PORT);
});