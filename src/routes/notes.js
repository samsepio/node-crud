const express=require('express');
const Note=require('../model/database');
const router=express.Router();

router.get('/add',(req,res,next)=>{
	res.render('notes');
});	
router.post('/add',async(req,res,next)=>{
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
		const note = new Note(req.body);
		await note.save();
		console.log(note);
		req.flash('success_msg','nota agregada satisfactoriamente');
		res.redirect('/notes');
	}
});

router.get('/notes',async(req,res,next)=>{
	const notes = await Note.find();
	res.render('apuntes',{
		notes
	});
});
router.get('/edit/:id',async(req,res,next)=>{
	const note = await Note.findById(req.params.id);
	res.render('edit',{
		note
	});
});
router.put('/edit/:id',async(req,res,next)=>{
	const {title,description} = req.body;
	const note = await Note.findByIdAndUpdate(req.params.id, {title,description});
	req.flash('success_msg','nota editada satisfactoriamente');
	res.redirect('/notes');
});
router.delete('/delete/:id',async(req,res,next)=>{
	await Note.findByIdAndDelete(req.params.id);
	req.flash('success_msg','nota eliminada satisfactoriamente');
	res.redirect('/notes');
});

module.exports = router;
