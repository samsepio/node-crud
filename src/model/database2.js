const mongoose=require('mongoose');
const bcrypt=require('bcrypt-nodejs');
const Schema=mongoose.Schema;

const userSchema = new Schema({
	name:{type},
	email:{type: String},
	user:{type: String},
	password:{type: String}
});

userSchema.methods.encryptPassword = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User',userSchema);