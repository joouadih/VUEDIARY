
"use strict";
const express = require('express');
const DB = require('./db');

const config = require('./config');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

//CREATE A DATABASE FILE WITH NAME "sqlitedb"
const db = new DB("sqlitedb");

const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function(req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');

    next();
}

app.use(allowCrossDomain)


// REGISTER POST FUNCTION
router.post('/register', function(req, res)
{

  console.log("Register request from " + req.connection.remoteAddress);

  db.insertUser(
    [
    req.body.username,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8)
    ]
  ,function (err)
  {

    // Return error
    if (err) return res.status(500).send("There was a problem registering the user.")

    db.selectByEmail(req.body.email, (err,user) =>
    {
      if (err) return res.status(500).send("There was a problem getting user")

      let token = jwt.sign({ id: user.id }, config.secret,
      {
        expiresIn: 86400 // expires in 24 hours
      });

      console.log("Register successfully");

      // Return token
      res.status(200).send({ auth: true, token: token, user: user });
    });

  });

});


// MIDDLWARE TOKEN VERIFY
router.get('/authenticate', function(req, res)
{

  let token = req.headers['x-access-token'];
  console.log(token);


  if(!token)
  {
    return res.status(401).send({ auth: false, message: 'No token provided' });
  };

  // VERIFY TOKEN
  jwt.verify(token, config.secret, function(err, decoded)
  {
    // RETURN ERROR
    if (err)
    {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    // RETURN OK
    res.status(200).send(decoded);
  });

});


// LOGIN FUNCTION
router.post('/login', (req, res) =>
{

  console.log("LOGIN REQUEST from " + req.connection.remoteAddress);

  db.selectByEmail(req.body.email, (err, user) =>
  {
      // INTERNAL ERROR
      if (err)
      {
        return res.status(500).send('Error on the server.');
      }

      // NO USER
      if (!user)
      {
        return res.status(404).send('No user found.');
      }

      // DECRYPT AND VALIDATE PASSWORD
      let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
      if (!passwordIsValid)
      {
        return res.status(401).send({ auth: false, token: null });
      };

      // CREATE TOKEN WITH 24 HOUR DURATION
      let token = jwt.sign({ id: user.id }, config.secret,
      {
        expiresIn: 86400 // expires in 24 hours
      });

      console.log("LOGIN REQUEST SUCCESS");

      // RETURN TOKEN
      res.status(200).send({ auth: true, token: token, user: user });

  });
})


// POST INSERT FUNCTION
router.post('/post', (req, res) =>
{
    console.log("INSERT MESSAGE from " + req.connection.remoteAddress);

    db.insertMessage
    (
      [
        req.body.user_id,
        req.body.message,
        req.body.tags
      ]
    ,function (err)
    {

      if (err)
      {
        console.log("ERROR inserting message");
      }

      console.log("SUCCESSFULLY INSERT MESSAGE from " + req.connection.remoteAddress);
      // RETURN SUCCESS
      res.status(200).send({  });

    });

})

// POST GET FUNCTION
router.get('/posts', (req, res) =>
{

    console.log("USER WITH ID:" + req.query.userid + " GETTING LETTER POSTS from " + req.connection.remoteAddress);

    db.selectMessagesID( req.query.userid, (err, messages) =>
    {
        // INTERNAL ERROR
        if (err)
        {
          return res.status(500).send('Error on the server.');
        }

        // NO USERID
        if (!req.query.userid)
        {
          return res.status(404).send('No userid found.');
        }

        console.log("SUCCESFULLY FETCHED " + messages.length + " MESSAGES. SEND TO USER WITH ID:" + req.query.userid + " & WITH IP:" + req.connection.remoteAddress);

        // RETURN MESSAGES
        res.status(200).send({ messages:messages });

    });

})

router.delete('/posts', function (req, res)
{
  var id = req.query.postid;

  console.log("DELETING LETTER POST WITH POSTID: " + req.query.postid + " FROM IP:" + req.connection.remoteAddress);

  db.deleteMessage( req.query.postid, (err, messages) =>
  {
      // INTERNAL ERROR
      if (err)
      {
        return res.status(500).send('Error on the server.');
      }

      // NO USERID
      if (!req.query.postid)
      {
        return res.status(404).send('No post ID found.');
      }

      console.log("SUCCESFULLY DELETED POST FROM IP:" + req.connection.remoteAddress);

      // RETURN TRUE
      res.status(200).send();

  });

});



app.use(router)

let port = process.env.PORT || 3000;

let server = app.listen(port, function()
{
  console.log('Node Express server listening on port ' + port)
});




/*
var io = require('socket.io')(server);

io.on('connection', function(socket)
{

    console.log(socket.id + ' connected to Socket');
    console.log('Client Adress: ' + socket.handshake.address);

    socket.emit('sockettest', "TEST EMIT");

    socket.on('getusers', function(data)
    {

      db.selectAll((err,users) =>
      {
          //Send all users to client
          socket.emit('allusers', users);
      });
    });

    socket.on('send-message', function(message)
    {
        //console.log(message);
        //var newMessage = { text : data.message, user : data.user, date : dateFormat(new Date(), 'shortTime') };
        //messages.push(newMessage);
        //io.emit('read-msg', newMessage);

         console.log(message.user.name + " sent a message");

        db.insertMessage(
          [
          message.user.name,
          message.user.name,
          message.text,
          message.date
          ]
        ,function (err)
        {

          console.log(err);

          console.log("Inserted message to DB");
          socket.emit('send-message', {code:200});

        });
    });

    socket.on('disconnect', function()
    {
        //users = users.filter(function(user)
        //{
        //    return user.id != socket.id;
        //});

        //io.emit('update-users', users);

        console.log(socket.id + ' disconnected to Socket');
    });

});*/
