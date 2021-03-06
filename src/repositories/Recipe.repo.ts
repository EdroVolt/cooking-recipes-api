import { Recipe, RecipeModel } from '../models/Recipe.model';
import { BaseRepo } from './Base.repo';

export class RecipeRepo extends BaseRepo<Recipe> {
  _collectionName: string = 'recipes';
  _model: Object = RecipeModel;
}
