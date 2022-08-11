const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {type: String, required: [true, 'firstName is required']},
    lastName: {type: String, required: [true, 'lastName is required']},
    email: { type: String, required: [true, 'email address is required'], 
             unique: [true, 'this email address has been used'] },
    password: {type: String, required: [true, 'password is required']}           
});

//replace plaintext password with hashed password before saving the document in the database
//pre middleware
userSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password, 10)
    .then(hash => {
        user.password = hash;
        next();
    })
    .catch(err => next(err));
});

//implement a method to compare the login password and the hash stored in the database
userSchema.methods.comparePassword = function(loginPassword) {
    return bcrypt.compare(loginPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);