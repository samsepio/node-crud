const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../model/database2');

passport.serialiseUser((done,user)=>{
	done(null,user.id);
});

passport.deserialiseUser(async(done,id)=>{
	const user = await User.findById(id);
	done(null,user);
});

passport.use('local-signup', new LocalStrategy,({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},async(req,res,done,user)=>{
	
	const user = await User.findOne({email: email});
	if(user){
		done(null,flase,req.flash('signupMessage','el correo ya esta registrado'));
	}else{
		const newUser = new User(req.body);
        	newUser.email = email;
        	newUser.password = newUser.encryptPassword(password);
        	console.log(newUser);
        	await newUser.save();
        	done(null,newUser);
	}
}));
