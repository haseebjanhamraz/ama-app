import mongoose, { Schema, Document, Model } from 'mongoose';
import { Cow } from './Cow';

export interface Milk extends Document {
    cowId: Cow['_id'];
    date: Date;
    shift: string;
    quantity: number;
}

const MilkSchema: Schema<Milk> = new mongoose.Schema({
    cowId: {
        type: Schema.Types.ObjectId,
        ref: 'Cow',
        required: true
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    shift: {
        type: String,
        required: [true, 'Tag is required'],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
});

// Correctly define the model
const MilkModel: Model<Milk> =
    mongoose.models.Milk || mongoose.model<Milk>('Milk', MilkSchema);

export default MilkModel;
