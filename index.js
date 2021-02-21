const express = require ('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/db');
const account = require('./accounting/account')

const app = express();
const port =3000;

app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(config.db,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{
  console.log("succesful");
})
mongoose.connection.on('error',(err)=>{
  console.log("Connection rip"+err);
})

app.get('/',(request, response) =>{
  response.send('Main!!');
});

app.use('/account', account);

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.listen(3000, () => {
  console.log("run on port",port);
});
