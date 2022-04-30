import { RecipeController } from '../controllers/Recipe.controller';
import express, { IRouter } from 'express';
import { IRouterCustom } from '../core/interface/router.interface';
import RecipeValidator from '../middlewares/validations/recipeRouter.validate';

const recipeController = new RecipeController();
const recipeValidator = new RecipeValidator();

export class RecipeRouter implements IRouterCustom {
  getRouter(): IRouter {
    const recipeRouter = express.Router();

    recipeRouter
      .route('/recipes')
      .get(recipeValidator.getAll, recipeController.getAll)
      .post(recipeValidator.post, recipeController.post);

    recipeRouter
      .route('/recipes/:id')
      .get(recipeValidator.getOneOrDelete, recipeController.getOne)
      .put(recipeValidator.put, recipeController.put)
      .delete(recipeValidator.getOneOrDelete, recipeController.delete);

    return recipeRouter;
  }
}
