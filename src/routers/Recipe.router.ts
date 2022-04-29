import { RecipeController } from '../controllers/Recipe.controller';
import express, { IRouter } from 'express';
import { IRouterCustom } from '../core/interface/router.interface';

const recipeController = new RecipeController();

export class RecipeRouter implements IRouterCustom {
  getRouter(): IRouter {
    const recipeRouter = express.Router();

    recipeRouter
      .route('/recipes')
      .get(recipeController.getAll)
      .post(recipeController.post);

    recipeRouter
      .route('/recipes/:id')
      .get(recipeController.getOne)
      .put(recipeController.put)
      .delete(recipeController.delete);

    return recipeRouter;
  }
}
