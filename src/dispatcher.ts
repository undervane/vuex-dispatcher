import { PaginationOptions, LoadOptions } from "./types";
import { isNil } from "./utils";
import { Store } from "vuex";

export class Dispatcher<T = unknown> {

  private action: string;
  private payload = new LoadOptions();

  private $store: Store<T>;

  constructor(action: string, store: Store<T>) {
    this.action = action;
    this.$store = store
  }

  filter<Y>(options: unknown, model: new () => Y): Dispatcher<T> {

    const emptyModel = isNil(model);

    if (emptyModel) throw new Error('To setup filter you must pass a model');

    const defaults = new model;
    this.payload.filters = { ...defaults, ...options };

    return this;
  }

  pagination(options: PaginationOptions): Dispatcher<T>
  pagination<Y>(options: Y, PaginationModel: new () => Y): Dispatcher<T>
  pagination<Y>(options: PaginationOptions | Y, PaginationModel?: new () => Y): Dispatcher<T> {

    const pagination = PaginationModel ? new PaginationModel() : new PaginationOptions();
    this.payload.pagination = { ...pagination, ...options };

    return this;
  };

  loading(callback: (status: boolean) => void): Dispatcher<T> {
    this.payload.loading = callback;
    return this;
  }

  error(callback: (error: string) => void): Dispatcher<T> {
    this.payload.error = callback;
    return this;
  }

  force(): Dispatcher<T> {
    this.payload.force = true;
    return this;
  };

  persist(): Dispatcher<T> {
    this.payload.persist = true;
    return this;
  };

  execute(callback: (data: unknown) => void): Promise<unknown> {
    return new Promise(async (resolve, reject) => {

      this.payload.loading(true);

      this.$store.dispatch(this.action, this.payload)
        .then((data: unknown) => {
          callback && callback(data);
          resolve(data);
        })
        .catch((error: unknown) => reject(error))
        .finally(() => this.payload.loading(false));

    });
  }
}
