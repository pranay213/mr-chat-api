import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    name: String,
    email: String,
});

export const Data = mongoose.model('data', DataSchema);
