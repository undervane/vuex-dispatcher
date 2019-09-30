import { PaginationOptions } from "./pagination-options.type";
import { isNil } from "../utils";
import { LoadOptions } from "./load-options.type";

export class Dispatch {
  action;
  payload = new LoadOptions();

  $store;

  constructor(action, store) {
    this.action = action;
    this.$store = store
  }
}

Dispatch.prototype.filter = function (model, options) {

  const emptyModel = isNil(model);

  if (emptyModel) throw new Error('To setup filter you must pass a model');

  const defaults = new model;
  this.payload["filters"] = { ...defaults, ...options };

  return this;
};

Dispatch.prototype.pagination = function (options) {

  const pagination = new PaginationOptions();
  this.payload["pagination"] = { ...pagination, ...options };

  return this;
};

Dispatch.prototype.pagination = function (paginationModel, options) {

  const pagination = new paginationModel();
  this.payload["pagination"] = { ...pagination, ...options };

  return this;
};

Dispatch.prototype.loading = function (callback) {
  this.payload.loading = callback;
  return this;
}

Dispatch.prototype.error = function (callback) {
  this.payload["error"] = callback;
  return this;
}

Dispatch.prototype.force = function () {
  this.payload.force = true;
  return this;
};

Dispatch.prototype.persist = function () {
  this.payload.persist = true;
  return this;
};

Dispatch.prototype.execute = function (callback) {
  return new Promise(async (resolve, reject) => {

    this.payload["loading"](true);

    try {
      const data = await this.$store.dispatch(this.action, this.payload);

      if (callback) {
        callback(data);
      }

      resolve(data);
    }
    catch (e) {
      reject(e);
    }

    this.payload["loading"](false);
  });

};
