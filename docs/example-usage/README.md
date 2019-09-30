# Example Usage

We will build up a project using Vuex Dispatcher with different scenarios so you can understand from different point of views.

## Basic Dispatch

The most simple dispatch possible, just dispatch an action with passed name and call execute to dispatch it.

```js
this.$dispatcher("myActionName").execute();
```

Generated payload:

```json
{
  "force": false,
  "persist": false
}
```

### Example action implementation

You can return anything from your action reducer, applied to previous example this would be like the following.

```js
export default new Vuex.Store({
  actions: {
    myActionName: function (store, payload) {
      return 'Return string from action';
    }
  }
})
```

To retrieve data you can asynchronously access the returned Promise

```js
async mounted() {
  const data = await this.$dispatcher("basic").execute();
  console.log(data) // Console: 'Return string from action'
}
```

## Persist Option

This enables the persist option in the Dispatcher payload. Use this option if you want to save the data in store for later usage. If you call this action mor than once, result should be returned from store, no further request would be made (unless you pass the [Force Option](#force-option))

```js
const items = await this.$dispatcher("getItems").persist().execute();
```

Generated payload:

```json
{
  "force": false,
  "persist": true
}
```

### Example action implementation

Following this you will see an example use case for when this option could be useful

```js
export default new Vuex.Store({
  actions: {
    getItems: function ({ state, commit }, payload) {
      
      let items = state.items;

      // We make the request if no items in Store
      if (!state.items) {
        items = ItemsService.getItems();
      }

      // Save the results for later usage
      if (payload.persist) {
        commit('SET_ITEMS', items);
      }

      return items;
    }
  }
})
```

## Force Option

This just enables the force option in dispatcher payload. Use this option if you want to call again the API or any other service to discard cache and retrieve the data again.

```js
const items = await this.$dispatcher("getItems").force().execute();
```

Generated payload:

```json
{
  "force": true,
  "persist": false
}
```

### Example action implementation

Following this you will see an example use case for when this option could be useful

```js
export default new Vuex.Store({
  actions: {
    getItems: function ({ state }, payload) {
      
      let items = state.items

      // We make the request if no items in 
      // Store or when Force Option is true
      if (!state.items || payload.force) {
        items = ItemsService.getItems()
      }

      return items;
    }
  }
})
```

::: tip
The Persist and Force options should be used in conjuntion to reduce server requests like this:

```js
getItems: function ({ state }, payload) {
      
  let items = state.items

  // We make the request if no items in 
  // Store or when Force Option is true
  if (!state.items || payload.force) {
    items = ItemsService.getItems()
  }

  // Save the results for later usage
  if (payload.persist) {
    commit('SET_ITEMS', items);
  }

  return items;
}
```
:::

## Loading Callback

An essential part of a fetching system is the loading status, this is really useful when implementing skeletons or loading spinners.

```js
let loading = false; // This will be updated on every loading status change

const items = 
  await this.$dispatcher("getItems")
    .loading(status => loading = status).execute();
```

Loading callback executes automatically in every status change, no need to implement in your action.

## Filter Option

It's common on modern application you need to pass on metadata to the service request in order to filter results. This becomes a very easy task when using Vuex Dispatcher.

First you need to define the filter model:

```js
class ItemsFilter {
  name;
  availability = 3000;
}
```

Then you just need to pass the model over with the user filter options

```js
const filterOptions = {
  name: 'Duck'
}

const items = 
  await this.$dispatcher("getItems")
    .filter(ItemsFilter, filterOptions).execute();
```

Generated payload:

```json
{
  "force": false,
  "persist": false,
  "filters": {
    "name": "Duck",
    "availability": 3000
  }
}
```

### Example action implementation

```js
export default new Vuex.Store({
  actions: {
    getItems: function ({ state }, payload) {
      return ItemsService.getItems(payload.filters)
    }
  }
})
```

## Pagination Options

You are provided with a custom made pagination options model to implement to your data fetching system. You are also allowed to pass your own pagination model.

```js
let pagination = {
  currentPage = 2
}

const items = 
  await this.$dispatcher("getItems")
    .pagination(pagination).execute();
```

Generated payload:

```json
{
  "force": false,
  "persist": false,
  "pagination": {
    "currentPage": 2,
    "orderAsc": false,
    "pageSize": 15,
    "rowCount": null,
    "pageCount": null,
    "lastRowOnPage": null,
    "firstRowOnPage": null,
    "orderBy": null
  }
}
```

To pass on your own pagination options, first create the model

```js
class PaginationModel {
  page;
  count = 30;
}
```

Then you can pass your own model along the options

```js
let pagination = {
  currentPage = 2
}

const items = 
  await this.$dispatcher("getItems")
    .pagination(PaginationModel, pagination).execute();
```

## Error Callback

If you need to provide any type of feedback when a request has failed, you can pass on an error callback that you will have available in your action implementation context.

```js
function onError(error) {
  console.error(error)
}

const items = 
  await this.$dispatcher("getItems")
    .error(onError).execute();
```

Generated payload:

```json
{
  "force": false,
  "persist": false,
  "error": function()
}
```

### Example action implementation

```js
export default new Vuex.Store({
  actions: {
    getItems: function ({ state }, payload) {
      ItemsService.getItems(payload.filters)
        .catch(error => payload.error(error));
    }
  }
})
```