/* eslint-disable prettier/prettier */
// move content of this file to schema
let mongoose = require('mongoose')
let bcrypt = require('bcrypt')
let SALT_WORK_FACTOR = 10
let s = require('./schema')
let Schema = mongoose.Schema
let UserSchema = new Schema(s)

//https://stackoverflow.com/questions/14588032/mongoose-password-hashing

//pre runs this func before saving a new user
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var User = mongoose.model('User', UserSchema)

module.exports = User
