const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const config = require('./config.js');

// passport's sole purpose is to authenticate requests
const passport = require('passport');
var expressSession = require('express-session');
const FacebookTokenStrategy = require('passport-facebook-token');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;





// configure Facebook Strategy for use by passport
passport.use(new FacebookTokenStrategy({
  clientID: config.FACEBOOK_APP_ID,
  clientSecret: config.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/login/facebook/callback"
},
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));


// passport provided methods to serialize and deserialize user info
// this means every subsequent request will not contain user credentials
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// setting up express server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// passport middleware use in our express server
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/../client/dist'));



//routes here

// getting response, but cannot parse body
app.post('/login/facebook', 

// function (req, res) {
//   console.log('request', req.body.params)
//   res.json(req.body.params);
// });
  passport.authenticate('facebook-token', {
    successRedirect: '/profile/',
    failureRedirect: '/profile/' // failing here
  }));

app.get('/login/facebook/callback',
  passport.authenticate('facebook-token', { failureRedirect: '/login/facebook' }),
  function(req, res) {
    console.log('connected');
    console.log('request', req);
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(), // failing here

  // is the note below important?
  //Note: For security reasons, the redirection URL must reside on the same host that is registered with Facebook.
  function (req, res) {
    console.log('here is request', req);
    res.render('profile', { user: req.user });
  });

// app.get('/', (req, res) => res.sendStatus(200));

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on ${port}!`));




{/* <script>
  window.fbAsyncInit = function() {
    FB.init({
      appId: '{your-app-id}',
      cookie: true,
      xfbml: true,
      version: '{latest-api-version}'
    });

  FB.AppEvents.logPageView();

  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return ;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>

app.get('/login/facebook/callback', 
	passport.authenticate('facebook', {
		successRedirect: '/home',
		failureRedirect : '/'
	}))


export default app;

