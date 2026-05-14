import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog {
  title: string;
  slug: string;
  short_description: string;
  content: string;
  category_slug: string;
  image: string;
}

export interface IBlogDocument extends IBlog, Document {}

const BlogSchema = new Schema<IBlogDocument>(
  {
    title: { type: String, required: true, unique: true, maxlength: 255 },
    slug: { type: String, required: true, unique: true, maxlength: 255 },
    short_description: { type: String, required: true, maxlength: 500 },
    content: { type: String, required: true },
    category_slug: { type: String, required: true, maxlength: 100 },
    image: { type: String, required: true, maxlength: 400 },
  },
  { timestamps: true },
);

export default mongoose.model<IBlogDocument>('Blog', BlogSchema);
