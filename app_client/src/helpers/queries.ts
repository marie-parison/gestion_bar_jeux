/* Object.keys(obj) return an array of each keys of the obj
* Then we map to return an array of string like 'key=value'
* example if queries = { limit: 1, offset: 2}
  * queriesArray ==>  ["limit=1", "offset=2"]
  *
  * Then we add '?' and join this array with '&' to have the final query string
* ex: '?limit=1&offset2'
*/

export function prepareQueries(queries) {
  let queriesArray = Object.keys(queries).map(key => key + "=" + queries[key]);
  return "?" + queriesArray.join('&');
}
