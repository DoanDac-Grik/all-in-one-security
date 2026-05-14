import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory {
  name: string;
  slug: string;
}

export interface ICategoryDocument extends ICategory, Document {}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    name: { type: String, required: true, maxlength: 255 },
    slug: { type: String, required: true, unique: true, maxlength: 255 },
  },
  { timestamps: true },
);

export default mongoose.model<ICategoryDocument>('Category', CategorySchema);
