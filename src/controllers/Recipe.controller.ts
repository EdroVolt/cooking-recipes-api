import { Recipe } from '../models/Recipe.model';
import { RecipeService } from '../services/Recipe.service';
import { BaseController } from './Base.controller';

export class RecipeController extends BaseController<Recipe> {
  _serviceObj: RecipeService = new RecipeService();
}
