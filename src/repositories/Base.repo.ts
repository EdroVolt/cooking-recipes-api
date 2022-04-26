import mongoose, { model } from 'mongoose';

export abstract class BaseRepo<schema> {
  abstract readonly _collectionName: string;
  abstract readonly _model: Object;

  findAll(filter: Object = {}, skip: number = 0, limit: number = 20) {
    return new Promise((resolve, reject) => {
      model(this._collectionName)
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec((err, docs) => {
          if (err) reject(err);
          resolve(docs);
        });
    });
  }

  findById(_id: mongoose.Types.ObjectId) {
    return new Promise((resolve, reject) => {
      model(this._collectionName)
        .findById(_id)
        .exec((err, doc) => {
          if (err) reject(err);
          resolve(doc);
        });
    });
  }

  create(data: schema) {
    return new Promise((resolve, reject) => {
      model(this._collectionName)
        .create(data)
        .then(
          (doc) => {
            resolve(doc);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  updateOne(_id: mongoose.Types.ObjectId, newData: {}) {
    return new Promise((resolve, reject) => {
      model(this._collectionName)
        .findByIdAndUpdate(_id, newData)
        .exec((err, doc) => {
          if (err) reject(err);
          resolve(doc);
        });
    });
  }

  deleteOne(_id: mongoose.Types.ObjectId) {
    return new Promise((resolve, reject) => {
      model(this._collectionName)
        .findByIdAndDelete(_id)
        .exec((err, doc) => {
          if (err) reject(err);
          resolve(doc);
        });
    });
  }

  countDocuments(filter: {} = {}): Promise<number> {
    return new Promise((resolve, reject) => {
      model(this._collectionName)
        .countDocuments(filter)
        .exec((err, count) => {
          if (err) reject(err);
          resolve(count);
        });
    });
  }
}
