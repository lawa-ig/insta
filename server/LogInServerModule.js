const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const config = require('./config.js');

// const db = require('../database/index.js');

// passport's sole purpose is to authenticate requests
const passport = require('passport');
var expressSession = require('express-session');
const FacebookStrategy = require('passport-facebook');
// var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


// hardcoded user info

var users = [
  { "id": 111, "username": "amy", "token": "amyspassword" },
  {
    "id": "10159843655865710",
    "username": "Will Putnam",
    "token": null
  },
  {
    "id": "10155209497660814",
    "username": "Larry Chang",
    "token": null
  },
  {
    "id": "10215398276259796",
    "username": "Albert Wong",
    "token": null
  }
];

// for hardcoded data. queries are built into new facebook strategy for database
function findUser(id) {
  for (var i = 0; i < users.length; i++) {
    if (id === users[i].id) {
      return users[i]
    }
  }
  return null;
}


// configure Facebook Strategy for use by passport
passport.use(new FacebookStrategy({
  // clientID: process.env.FB_ID,
  clientID: config.FACEBOOK_APP_ID,
  // clientSecret: process.env.FB_SECRET,
  clientSecret: config.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/login/facebook/callback",
  profileFields: ['id', 'displayName', 'link', 'photos', 'emails'],
  enableProof: true
},
  function (accessToken, refreshToken, profile, done) {

    // for database


    // for this to work, user id will have to be the same as facebook profile id. might need to add in a facebook_id field. don't see it in db
    // db.query('SELECT * FROM users WHERE user_id = ?', profile.id, function (err, user) {
    //   if (err) {
    //     return done(err);
    //   }
    // user is what will be returned from the db. should only be one user rather than many rows
    // hopefully, nomenclature is not confusing
    //   if (user.length > 0) {
    //     return done(null, user);
    //   }
    //   if (user.length === 0) {
    //     var newUser = {
    //       "id": profile.id,
    //       "username": profile.displayName,
            //  "photo": profile.photos[0].value
    //     }
    //     db.query('INSERT INTO users (user_id, name) values (?, ?)', [newUser.id, newUser.username], function(err, user) {
    //       if (err) {
    //         return done(err);
    //       }
    //       console.log('user inserted into db');
    //       return done(null, newUser);
    //     })
    //   }
    // });


    // for use with hardcoded data
    var user = findUser(profile.id);
    if (user) {
      console.log('users', users);
      console.log('profile', profile);
      console.log('emails', profile.emails);
      return done(null, user);
    } else {
      var newUser = {
        'id': profile.id,
        'username': profile.displayName,
        // 'token': token,
        'email': profile.emails
      };
      users.push(newUser);
      console.log('users again', users);
      console.log('profile', profile);
      console.log('emails', profile.emails);
      return done(null, newUser);
    }

  }));


// passport provided methods to serialize and deserialize user info
// this means every subsequent request will not contain user credentials

// for use with hardcoded data
passport.serializeUser(function (user, done) {
  console.log('getting to serialize user')
  done(null, user.id);
});

passport.deserializeUser(function (user, done) {
  console.log('getting to deserialize user')
  done(null, user);
});


// for use with db

// passport.serializeUser(function (user, done) {
//   console.log('getting to serialize user')
//   done(null, user.user_id);
// });

// passport.deserializeUser(function (id, done) {
//   db.query('SELECT * FROM users WHERE user.facebook_id = '+id, function(err, user) {
//     return done(err, user[0]);
//   });
// });


// setting up express server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));

// passport middleware use in our express server
app.use(expressSession({ secret: 'mySecretKey' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/../client/dist'));



//routes here

// app.get('/logon', function (req, res) {
//      console.log('request', req.body.params)
//      res.json(req.body.params);
//    });

app.get('/login/facebook',

  // will keep this in case we need to track request params later
  // function (req, res) {
  //   console.log('request', req.body.params)
  //   res.json(req.body.params);
  // });
  passport.authenticate('facebook', { scope: 'email' }), function (req, res) {
    console.log('connected');
    console.log('request', req);
    // Successful authentication, redirect home.
    res.send('Logged in with Facebook!');
  });


app.get('/login/facebook/callback',

  passport.authenticate('facebook', { failureRedirect: 'http://www.instagram.com' }),
  function (req, res) {
    // Successful authentication, redirect home. 
    console.log('here is user', res.req.user);
    res.redirect('/');
  });

app.get('/logout', function (req, res) {
  req.logout();
  console.log('logging out at route level');
  res.redirect('/'); // redirect to home page
});

// app.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(), // failing here. will need to fix when connecting routes

//   function (req, res) {
//     console.log('here is request', req);
//     res.render('profile', { username: req.user });
//   });


let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on ${port}!`));





// this is for the facebook sdk stuff. probably won't be using it

// /* <script>
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId: '{your-app-id}',
//       cookie: true,
//       xfbml: true,
//       version: '{latest-api-version}'
//     });

//   FB.AppEvents.logPageView();

//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return ;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
// </script>

// app.get('/login/facebook/callback', 
//  passport.authenticate('facebook', {
//    successRedirect: '/home',
//    failureRedirect : '/'
//  }))