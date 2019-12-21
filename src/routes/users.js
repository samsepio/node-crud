const express=require('express');
const router=express.Router();

router.get('/signin',(req,res,next)=>{
	res.render('signin');
});
router.get('/signup',(req,res,next)=>{
	res.render('signup');
});
router.post('/signup',(req,res,next)=>{
	const {name,email,password,comfirm} = req.body;
	const errors = [];
	console.log(req.body)
	if(name.length <= 0){
		errors.push({text: 'Inserta Un Nombre'});
	}
	if(password != comfirm){
		errors.push({text: 'el password no conincide'});
	}
	if(password.length > 4){
		errors.push({text: 'la contraseña debe ser almenos de 4 caracteres'})
	}
	if(errors.length > 0){
		res.render('signup',{errors,email,name,password,comfirm});
	}else{
		res.send('ok');
	}
});

module.exports=router;
