var express = require('express');
var app = express();
app.set('view engine', 'pug');

app.use(express.static('static'));

app.get('/', function(req,res){
    res.render('index');
});

app.listen(process.env.PORT, function () {
  console.log('Needo listening on port '+ process.env.PORT);
});