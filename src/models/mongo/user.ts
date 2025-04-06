import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
});

export const User = mongoose.model('User', UserSchema);
