import mongoose, { Schema, Document } from 'mongoose';
import MilkModel, { Milk } from './Milk';


export interface Cow extends Document {
  tag: string;
  breed: string;
  dob: Date;
  isAvailable: boolean
  // milkRecord: Milk[]
}



const CowSchema: Schema<Cow> = new mongoose.Schema({
  tag: {
    type: String,
    required: [true, 'Tag is required'],
    trim: true,
    unique: true,
  },
  breed: {
    type: String,
    required: [true, 'Breed is required'],
    unique: true,
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  // milkRecord: [MilkModel],


});

const CowModel =
  (mongoose.models.Cow as mongoose.Model<Cow>) ||
  mongoose.model<Cow>('Cow', CowSchema);

export default CowModel;
