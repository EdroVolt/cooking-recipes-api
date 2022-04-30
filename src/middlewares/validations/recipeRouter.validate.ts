import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import IRouterValidator from 'interfaces/validator.interface';

export default class RecipeValidator implements IRouterValidator {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const schema = Joi.object({
      page: Joi.number().min(1).max(50000),
      title: Joi.string().length(50)
    });

    try {
      await schema.validateAsync({ ...req.query });
      next();
    } catch (err) {
      next(err);
    }
  }

  async getOneOrDelete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const schema = Joi.object({
      id: Joi.string().length(24).required()
    });

    try {
      await schema.validateAsync({ id: req.params.id });
      next();
    } catch (err) {
      next(err);
    }
  }

  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    const schema = Joi.object({
      title: Joi.string().min(3).max(25),
      ingredient: Joi.string().min(10),
      recipe: Joi.string().min(10),
      image: Joi.string().min(3).max(25).required()
    });
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  }

  async put(req: Request, res: Response, next: NextFunction): Promise<void> {
    const schema = Joi.object({
      id: Joi.string().length(24).required(),
      title: Joi.string().min(3).max(25),
      ingredient: Joi.string().min(10),
      recipe: Joi.string().min(10),
      image: Joi.string().min(3).max(25)
    });
    try {
      await schema.validateAsync({ ...req.body, id: req.params.id });
      next();
    } catch (err) {
      next(err);
    }
  }
}
