/**
 * 
 * @param {JSON} enumFilters 
 * @param {String} keyword 
 * @returns filter query
 * @example
 * formatEnumFilters({
 * 	"OPEN": true,
 * 	"FINISHED": true,
 * 	"CANCELED": false	
 * }, "status")
 * // It's equal to: "(status=OPEN OR STATUS=FINISHED)"
 */
const formatEnumFilters = (enumFilters, keyword) => {
	let filters = Object.keys(enumFilters).filter(key => enumFilters[key]);
	if(filters.length == 0) return null;
	return `(${filters.map(filter => `${keyword}=${filter}`).join(" OR ")})`; 
}

/**
 * 
 * @param {Array} enumFilters 
 * @returns array of filters
 * @example
 * formatMultipleEnumFilters([
 * 	[
 *    {
 * 	   "OPEN": true,
 * 	   "FINISHED": true,
 * 	   "CANCELED": false
 * 	  },
 *    "status"
 *  ],
 *  [
 *    {
 * 	   "SOLD": true,
 *     "AVAILABLE": false
 *    },
 *    "availability"
 *  ]
 * ])
 * // It's equal to: ["(status=OPEN OR STATUS=FINISHED)", "(availability=SOLD)"]
 */
const formatMultipleEnumFilters = (enumFilters) => 
	enumFilters.map(filter => formatEnumFilters(filter[0], filter[1])).filter(filter => filter != null)

/**
 * 
 * @param {String} search 
 * @param {Array} keywords 
 * @returns search query
 * @example
 * formatSearch("jel", ["title", "author"])
 * // It's equal to: "(title LIKE jel OR author LIKE jel)"
 */
const formatSearchFilters = (search, keywords) => {
	if(search == "") return null;
	return `(${keywords.map(keyword => `${keyword}ILIKE${search}`).join(" OR ")})`;
}

/**
 * 
 * @param {Array} filters 
 * @returns query
 * @example
 * formatFilters(["(status=OPEN OR STATUS=FINISHED)", "(title LIKE jel OR author LIKE jel)"])
 * // It's equal to: "((status=OPEN OR STATUS=FINISHED) AND (title LIKE jel OR author LIKE jel))"
 */
const formatFilters = (filters) => {
	let formatted = `(${filters.filter(filter => filter != null).join(" AND ")})`;
	return formatted == "()" ? "" : formatted;
};

const groupBy = (list, keyGetter) => {
	let keys = {};
	list.forEach((item) => {
		let key = keyGetter(item);
		keys[key] = keys[key] || [];
		keys[key].push(item);
	});
	return [ Object.keys(keys).map((key) => keys[key]), keys ];
}

const countActiveFilters = (filters) =>
  Object.keys(filters).map(key => filters[key]).reduce((x, y) => y + x)

export { 
  formatEnumFilters, 
  formatMultipleEnumFilters, 
  formatSearchFilters, 
  formatFilters, 
  groupBy, 
  countActiveFilters
};