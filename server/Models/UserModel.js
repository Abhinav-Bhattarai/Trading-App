import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    Password: {
        type: String,
        required: true
    },

    UID: {
        type: String,
        default: Math.floor(Math.random() * 100000000).toString()
    },

    CreationDate: {
        type: String,
        default: new Date(parseInt(Date.now())).toLocaleDateString()
    }
});

export const UserModel = mongoose.model('UserModel', Schema);