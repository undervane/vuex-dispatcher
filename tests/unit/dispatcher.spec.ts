import { createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex';
import { Dispatcher } from '../../src/dispatcher'
import { LoadOptions } from '../../src/types';
import { nextTick } from 'q';

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Dispatcher', () => {

  let store: Store<{}>;

  beforeEach(() => {
    store = new Store({
      actions: {
        test(store, payload) {
          return payload;
        },
        testError(store, { error }) {
          error('Error message')
        }
      }
    });
  });

  it('should return basic payload', async () => {
    const payload = await new Dispatcher('test', store).execute();
    expect(JSON.stringify(payload))
      .toEqual(JSON.stringify(new LoadOptions))
  });

  it('should return basic payload as callback', async () => {
    new Dispatcher('test', store).execute(payload =>
      expect(JSON.stringify(payload))
        .toEqual(JSON.stringify(new LoadOptions))
    );
  });

  it('should return error because dispatch failed', async () => {

    spyOn(store, 'dispatch').and.callFake(() => new Promise((resolve, reject) => reject('Error')));

    try {
      await new Dispatcher('testError', store).execute();
    } catch (error) {
      expect(error).toBeTruthy();
    }

  });

  it('should return persist enabled', async () => {
    const payload = await new Dispatcher('test', store).persist().execute();
    const expectedPayload = { ...new LoadOptions, persist: true }
    expect(JSON.stringify(payload))
      .toEqual(JSON.stringify(expectedPayload))
  });

  it('should return force enabled', async () => {
    const payload = await new Dispatcher('test', store).force().execute();
    const expectedPayload = { ...new LoadOptions, force: true }
    expect(JSON.stringify(payload))
      .toEqual(JSON.stringify(expectedPayload))
  });

  it('should call loading callback twice', async () => {
    const callback = jest.fn()

    await new Dispatcher('test', store).loading(callback).execute();

    nextTick(() =>
      expect(callback).toHaveBeenCalledTimes(2)
    );
  });

  describe('filter option', () => {

    it('should fire error because no model has been passed', async () => {

      try {
        (new Dispatcher('test', store) as any).filter({ name: 'Sergio' }, null).execute();
      } catch (error) {
        expect(error.message).toEqual('To setup filter you must pass a model')
      }

    });

    it('should return custom filters from model', async () => {

      class TestModel {
        name?: String;
        animal = 'Penguin';
      }

      const payload = await new Dispatcher('test', store).filter({ name: 'Sergio' }, TestModel).execute();

      const expectedPayload = {
        ...new LoadOptions, filters: {
          animal: 'Penguin',
          name: 'Sergio'
        }
      }

      expect(JSON.stringify(payload))
        .toEqual(JSON.stringify(expectedPayload))
    });

  })

  it('should return custom pagination from original model', async () => {

    const payload = await new Dispatcher('test', store).pagination({ currentPage: 5, pageSize: 30 }).execute();

    const expectedPayload = {
      ...new LoadOptions, pagination: {
        pageSize: 30,
        currentPage: 5
      }
    }

    expect(JSON.stringify(payload))
      .toEqual(JSON.stringify(expectedPayload))
  });

  it('should return custom pagination from custom model', async () => {

    class TestPaginationModel {
      page?: number;
      count?: number = 15;
      total?: number = 30;
    }

    const payload = await new Dispatcher('test', store).pagination({ page: 1, total: 5 }, TestPaginationModel).execute();

    const expectedPayload = {
      ...new LoadOptions, pagination: {
        count: 15,
        total: 5,
        page: 1
      }
    }

    expect(JSON.stringify(payload))
      .toEqual(JSON.stringify(expectedPayload))
  });

  describe('Error Option', () => {

    it('should call error callback', async () => {
      const callback = jest.fn()

      await new Dispatcher('testError', store).error(callback).execute();

      nextTick(() =>
        expect(callback).toHaveBeenCalledTimes(1)
      );
    });

    it('should call error callback with default message', async () => {

      spyOn(console, 'error').and.callFake((message: string) => expect(message).toBeTruthy())

      await new Dispatcher('testError', store).execute();

    });

  })

});