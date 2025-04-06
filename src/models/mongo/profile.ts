import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    name: String,
    email: String,
});

export const Profile = mongoose.model('profile', ProfileSchema);
