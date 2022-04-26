import mongoose from 'mongoose';

export interface Recipe {
  _id: mongoose.Types.ObjectId;
  title: string;
  ingredient: string;
  recipe: string;
  image: string;
}

// Recipe schema
const schema = new mongoose.Schema<Recipe>(
  {
    title: { type: String, required: true, minlength: 3, maxlength: 25 },
    ingredient: { type: String, required: true, minlength: 10 },
    recipe: { type: String, required: true, minlength: 10 },
    image: { type: String, required: true, minlength: 3, maxlength: 25 }
  },
  { timestamps: true }
);

// Register Recipe schema as a mongoose model
export const RecipeModel = mongoose.model('recipes', schema);
