var database = require('./database');
var jwt = require('jsonwebtoken');
var express = require("express");
const request = require('request');
var app = express();


app.use(express.json());

const port = 3000
app.listen(port, () => {
 console.log("Server running on port " + port + ", http://localhost:" + port);
});

//Index Page
app.get('/',function(req,res) {
  res.sendFile('index.html', { root: '.' })
});


//Get Users
app.get("/api/v1/todes",verifyToken,(req, res) => {
    jwt.verify(req.token,'shhhhh', (err, authData) => {
      if(err){
        return res.status(401).send({
          message: 'Unauthorized'
        })
      }else {
        database.getAllUsers().then( data => res.json({
          data: data,
          authData
        }));
      }
    });
});


//Create User
app.post('/api/v1/createuser',(req, res) => {
   
  const nickname = req.body.nickname;
  const password = req.body.password;
  if(typeof password === 'undefined' || typeof nickname === 'undefined'){
    return res.status(400).send({
      message: "Bad request"
    });
  }

  database.insertUser(nickname,password).then(data => {
    if(data === 1){
      return res.status(201).send({
        message: 'Created'
      });
    }else{
      return res.status(400).send({
        message: 'Bad request'
      });
    }
  }).catch( () => {
    return res.status(400).send({
      message : '409 Conflict'
    })
  });
});

//Upload Image
app.post('/api/v1/upload',verifyToken,(req, res) => {
/*
Hämta filen från användare √
Ladda upp fil på imggb √
Hämta länk
Insert länk i databas
*/
const image = req.body.data;
if(typeof image === 'undefined'){
  return res.status(400).send({
    message : "Bad request1"
  })
}
jwt.verify(req.token,'shhhhh', (err, authData) => {
  if(err){
    return res.status(401).send({
      message: 'Unauthorized'
    })
  }else {
    const nickname = authData.user[0].nickname;
    var options = {
      'method': 'POST',
      'url': 'https://api.imgbb.com/1/upload?key=07df9adef397c42e56ab7738bcb86576',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      formData: {
        'image': image
      }
    };
      request(options, function (error, response,body) { 
        if (error){
          return res.status(400).send({
            message : "Bad request2"
          });
        }else{
          const jsonobject = JSON.parse(body);
          database.updateUserImage(nickname,jsonobject.data.display_url).then( data => {
            if(data === 1){
              return res.status(200).send({
                message : "Updated"
              });
            }else{
              return res.status(400).send({
                message : "Bad request3"
              });
            }
          }).catch( () => {
            return res.status(400).send({
              message : "Bad request4"
            });
          });
        }
      });
    }
  });
});

// Get Token
app.post('/api/v1/login', (req, res) => {

  var nickname = req.body.nickname; 
  var password = req.body.password;
  if(typeof password === 'undefined' || typeof nickname === 'undefined'){
    return res.status(400).send({
      message: "Bad request"
    });
  }

  database.getUser(nickname, password).then(data => {
    var user = data;
    if(user[0].id === 0){
      return res.status(404).send({
        message: "Not Found"
      });
    }else{
      jwt.sign({user}, 'shhhhh', { expiresIn: "86400s" },(err, token) => {
        if(err){
          return res.status(406).send({
            message: 'Not Acceptable'
          })
        }
        return res.json({
          token: token,
          expiresIn : "86400s"
        });
      });
    }
  }).catch( () => {
    return res.status(404).send({
      message: "Not Found",
    });
  });
});

function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }else {
    res.status(403).send({
      message: 'Forbidden'
    });
  }
}
