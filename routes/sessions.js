var express = require('express');
var app = express();
var router = express.Router();
var User = require('../models/User.js')
var sessions = require('express-session');
var session = {};
app.use(sessions({
	secret: 'yeuidhjksydhskhu',
	saveUninitialized: true,
	resave: false,
	cookie: { secure: true }
}));

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('sessions/signin', {});
});


router.post('/sessions/new', function(req, res) {
	console.log('sessions new = ', req.body)

	User.findOne({email: req.body.email}, function(err, user) {
		if (err) return next(err)
		else
			if(user && user.password === req.body.password){
				session = req.sessions;
				session.sessionId = user.email;
				res.redirect('/redirects');
			}
		// res.json({message: "Invalid Credentails!", status: false});
	});

});

router.get('/redirects', function(req, res){
	session = req.sessions;
	console.log("session = ", session)
	if(session.sessionId){
		res.redirect('/consultants')
	} else {
		res.end('How are you ?')
	}

})



module.exports = router;
