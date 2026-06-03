import { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: { type: String, default: 'CineHaven journal', trim: true },
    image: { type: String, default: '/images/hero-birthday.png' },
    readTime: { type: String, default: '4 min read' },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
    authorName: { type: String, default: 'CineHaven Team' },
  },
  { timestamps: true }
);

export default models.Blog || model('Blog', BlogSchema);
