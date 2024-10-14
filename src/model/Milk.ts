import mongoose, { Schema, Document } from 'mongoose';
import { Cow } from './Cow';
export interface Milk extends Document {
    shift: String
    quantity: Number;
}
const MilkSchema: Schema<Milk> = new mongoose.Schema({
    shift: {
        type: String,
        required: [true, 'Shift is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Milk quantity is required'],
    },
});

const MilkModel =
    (mongoose.models.Milk as mongoose.Model<Milk>) ||
    mongoose.model<Milk>('Milk', MilkSchema);

export default MilkModel;
