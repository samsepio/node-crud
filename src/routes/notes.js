const express=require('express');
const Note=require('../model/database');
const {isAuthenticated} = require('../helpers/auth');
const router=express.Router();

/*
router.use((req,res,next) => {
	isAuthenticated(req, res, next);
	next();
});
*/

router.get('/add',isAuthenticated,(req,res,next)=>{
	res.render('notes');
});	
router.post('/add', isAuthenticated ,async (req,res,next)=>{
	const {title, description} = req.body;
	const errors = []
	if(!title){
		errors.push({text: 'Porfavor Escriba Un Titulo'});
	}
	if(!description){
		errors.push({text: 'Porfavor Ingrese Una Descripcion'});
	}
	if(errors.length > 0){
		res.render('notes',{
			errors,
			title,
			description
		});
	}else{
		const newNote = new Note({title, description});
		newNote.user = req.user.id;
		console.log(req.user.id);
		await newNote.save();
		console.log(newNote);
		req.flash('success_msg','nota agregada satisfactoriamente');
		res.redirect('/notes');
	}
});

router.get('/notes', isAuthenticated ,async (req,res,next)=>{
	const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
	res.render('apuntes',{
		notes
	});
});
router.get('/edit/:id', isAuthenticated ,async (req,res,next)=>{
	const note = await Note.findById(req.params.id);
	res.render('edit',{
		note
	});
});
router.put('/edit/:id', isAuthenticated ,async (req,res,next)=>{
	const {title,description} = req.body;
	const note = await Note.findByIdAndUpdate(req.params.id, {title,description});
	req.flash('success_msg','nota editada satisfactoriamente');
	res.redirect('/notes');
});
router.delete('/delete/:id',isAuthenticated ,async (req,res,next)=>{
	await Note.findByIdAndDelete(req.params.id);
	req.flash('success_msg','nota eliminada satisfactoriamente');
	res.redirect('/notes');
});

module.exports = router;
