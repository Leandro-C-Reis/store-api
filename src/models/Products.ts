import mongoose from 'mongoose';
import { mongo_db } from '../config/variables';

const ProductSchema = new mongoose.Schema({
    id: String,
    title: String,
    value: String,
    tags: [String],
    inventory: Number,
    created_at: Date,
    updated_at: Date,
});

export default mongoose.model(`${mongo_db}`, ProductSchema);