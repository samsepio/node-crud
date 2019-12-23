const express=require('express');
const router=express.Router();
const User=require('../model/database2');
const passport=require('passport');

router.get('/signin',(req,res,next)=>{
	res.render('signin');
});
router.post('/signin',passport.authenticate('local-signin',{
	successRedirect: '/notes',
	failureRedirect: '/signin',
	failureFlash: true
}));
router.get('/signup',(req,res,next)=>{
	res.render('signup');
});
router.post('/signup',async(req,res,next)=>{
	const {name,email,password,comfirm} = req.body;
	const errors = [];
	console.log(req.body)
	if(name.length <= 0 || email.length <= 0 || password.length <= 0 || comfirm.length <= 0){
		errors.push({text: 'Todos los Campos Son Hobligatorios'});
	}
	if(password != comfirm){
		errors.push({text: 'las contraseñas no conciden'});
	}
	if(password.length < 4){
		errors.push({text: 'la contraseña debe ser almenos de 4 caracteres'});
	}
	if(errors.length > 0){
		res.render('signup',{
			errors,
			email,
			name,
			password,
			comfirm
		});
	}else{
		const user = await User.findOne({email: email})
		if(user){
			req.flash('error_msg','ya se han registrado con ese correo');
			res.redirect('/signup');
		}
		const newUser = new User({name,email,password});
               	newUser.password = await newUser.encryptPassword(password);
                console.log(newUser);
                await newUser.save();
                req.flash('success_msg','estas registrado');
                res.redirect('/signin');
	}
});
router.get('/logout',(req,res,next)=>{
	req.logout();
	res.redirect('/');
});

module.exports=router;
