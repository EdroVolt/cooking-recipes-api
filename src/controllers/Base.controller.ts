import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { BaseService } from '../services/Base.service';

export abstract class BaseController<schema> {
  abstract readonly _serviceObj: BaseService<schema>;

  // getAll()
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { page, title, ...filter } = req.query || { page: 0 };

    try {
      const data = await this._serviceObj.findAll({
        page: +page!,
        title: title?.toString(),
        ...filter
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  // getOne()
  getOne = async (req: Request, res: Response, next: NextFunction) => {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.id);
    try {
      const data = await this._serviceObj.findOne(_id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  // post()
  post = async (req: Request, res: Response, next: NextFunction) => {
    const doc: schema = req.body;

    try {
      const data = await this._serviceObj.createOne(doc);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  // put()
  put = async (req: Request, res: Response, next: NextFunction) => {
    const doc: {} = req.body;
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.id);
    try {
      const data = await this._serviceObj.updateOne(_id, doc);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  // delete()
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.id);
    try {
      const data = await this._serviceObj.deleteOne(_id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
}
