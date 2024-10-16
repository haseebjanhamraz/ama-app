import mongoose, { Schema, Document, Model } from 'mongoose';
import { Cow } from './Cow';

export interface Vaccine extends Document {
    cowId: Cow['_id'];
    date: Date;
    vaccineName: string;
    createdAt: Date;
}

const VaccineSchema: Schema<Vaccine> = new mongoose.Schema({
    cowId: {
        type: Schema.Types.ObjectId,
        ref: 'Cow',
        required: [true, 'Cow Id is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    vaccineName: {
        type: String,
        required: [true, 'Tag is required'],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Correctly define the model
const VaccineModel: Model<Vaccine> =
    mongoose.models.Vaccine || mongoose.model<Vaccine>('Vaccine', VaccineSchema);

export default VaccineModel;
