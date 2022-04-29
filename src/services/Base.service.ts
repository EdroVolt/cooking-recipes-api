import mongoose from 'mongoose';
import { BaseRepo } from '../repositories/Base.repo';

export type BaseFilter = {
  page?: number;
  title?: RegExp | string;
};

export abstract class BaseService<schema> {
  abstract readonly _repoObj: BaseRepo<schema>;

  // TODO: findAll()
  async findAll(filter: BaseFilter) {
    // pagination (10 documents by request )
    const limit = 10;
    const skip = ((filter.page || 1) - 1) * limit;

    // find all documents that includes title
    if (filter.title) filter.title = new RegExp(`${filter.title}`, 'i');

    try {
      const docs = await this._repoObj.findAll({ ...filter }, skip, limit);
      const count = await this._repoObj.countDocuments({ ...filter });

      // calculate numOfPages
      const numOfPages = Math.ceil(count / limit);

      return { data: docs, numOfPages };
    } catch (err: Error | any) {
      throw new Error(err.message);
    }
  }

  // TODO: findOne()
  async findOne(_id: mongoose.Types.ObjectId) {
    try {
      const doc = await this._repoObj.findById(_id);
      return doc;
    } catch (err: Error | any) {
      throw new Error(err.message);
    }
  }

  // TODO: createOne()
  async createOne(data: schema) {
    try {
      const doc = await this._repoObj.create(data);
      return doc;
    } catch (err: Error | any) {
      throw new Error(err.message);
    }
  }

  // TODO: updateOne()
  async updateOne(_id: mongoose.Types.ObjectId, data: {}) {
    try {
      await this._repoObj.updateOne(_id, data);

      const newDoc = await this._repoObj.findById(_id);
      return newDoc;
    } catch (err: Error | any) {
      throw new Error(err.message);
    }
  }

  // TODO: deleteOne()
  async deleteOne(_id: mongoose.Types.ObjectId) {
    try {
      const doc = await this._repoObj.deleteOne(_id);
      return doc;
    } catch (err: Error | any) {
      throw new Error(err.message);
    }
  }
}
