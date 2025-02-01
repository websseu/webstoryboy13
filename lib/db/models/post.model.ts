import { Document, Model, model, models, Schema } from 'mongoose';
import { IPostInput } from '@/lib/types';

export interface IPost extends Document, IPostInput {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    components: { type: String },
    description: { type: String, trim: true },
    isPublished: { type: Boolean, required: true, default: false },
    author: { type: String, required: true },
    images: { type: String, required: true },
    youtubeId: { type: String },
    tags: { type: [String], default: [] },
    numReviews: { type: Number, default: 0 },
    numViews: { type: Number, default: 0 },
    numLikes: { type: Number, default: 0 },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = (models.Post as Model<IPost>) || model<IPost>('Post', postSchema);

export default Post;
