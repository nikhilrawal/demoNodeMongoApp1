const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const personschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        min: 0 // Age should be non-negative
    },
    address: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true // Default value for activity status
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
personschema.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt)
        person.password = hashedPassword
        next()
    } catch (error) {
        console.log(error)
    }
})
personschema.methods.comparePassword = async function (parampass) {
    try {
        const isMatch = await bcrypt.compare(parampass, this.password)
        return isMatch
    } catch (error) {
        console.log("password didn't match", parampass, this.password)
        return false;
    }
}
Person = mongoose.model('Person', personschema)
module.exports = Person