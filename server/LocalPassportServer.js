const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const passport = require('passport');
var LocalStrategy = require('passport-local');


var expressSession = require('express-session');

passport.use(new LocalStrategy(
    function (email, password, done) {

        // check if email is in db
        if (email.includes('@')) {
            return done(null, { id: 1, name: username });
        } else {
            return done(null, false);
        }
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

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



app.get('/', function (req, res) {
    console.log(req.user);
    res.render('index');
});

app.post('/login', passport.authenticate('local',
    {
        failureRedirect: '/',
    }), function (req, res) {
        console.log('user', req.user);
        res.redirect('/dashboard');
    });

function requireLogin(req, res, next) {
    if (!req.user) return res.redirect('/');
    next();
}

app.get('/dashboard', requireLogin, function (req, res) {
    res.render('dashboard', { user: req.user });
});


let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on ${port}!`));