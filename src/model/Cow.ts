import mongoose, { Schema, Document, Model } from 'mongoose';


export interface Cow extends Document {
  tag: string;
  breed: string;
  sex: string;
  dob: Date;
  isMilking: boolean;
  isAvailable: boolean;
}


const CowSchema: Schema = new mongoose.Schema({
  tag: {
    type: String,
    required: [true, 'Tag is required'],
    trim: true,
    unique: true,
  },
  breed: {
    type: String,
    required: [true, 'Breed is required'],
  },
  sex: {
    type: String,
    required: [true, 'Sex is required'],
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

// Correctly define the model
const CowModel: Model<Cow> =
  mongoose.models.Cow || mongoose.model<Cow>('Cow', CowSchema);

export default CowModel;
