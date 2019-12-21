const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const noteSchema = new Schema({
	title:{type: String},
	description:{type: String},
	created_at: {type: Date, default: Date.now}
});

module.exports=mongoose.model('notes',noteSchema);
