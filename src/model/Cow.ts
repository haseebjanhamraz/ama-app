import mongoose, { Schema, Document } from 'mongoose';


export interface Cow extends Document {
  tag: string;
  breed: string;
  dob: Date;
  isAvailable: boolean
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
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const CowModel =
  (mongoose.models.Cow as mongoose.Model<Cow>) ||
  mongoose.model<Cow>('Cow', CowSchema);

export default CowModel;
