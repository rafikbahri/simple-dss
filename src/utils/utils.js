/**
 * This module contains some utilites function 
 * such as displayItem that displays an item data when we FIND query SDSS
 */

var fs = require('fs');
var _ = require('lodash');
var colors=require('colors');
var displayItems = function (items, schema) {
    var str = '';
    items.forEach(item => {
        displayItem(item, schema);
    });
}

var displayItem = function (item, schema) {
    var str = item[schema.primaryKey] + ', ';
    for (let i = 0; i < schema.fields.length; i++) {
        str = str.concat(item[schema.fields[i].fieldName], ', ');
    }
    str = str.substr(0, str.length - 2);
    console.log(str.green);
}

var exists = function (data, key, value) {

    for (let i = 0; i < data.length; i++) {
        if (data[i][key] === value)
            return true;
    }
    return false;
}

var indexOfItem = function (data, key, value) {
    for (let i = 0; i < data.length; i++) {
        if (data[i][key] === value)
            return i;
    }
    return -1;
}

var fieldExists = function (schema, field) {
    return _.has(schema, field);
}


var getSchema = function (schemaFilePath) {
    var schema = fs.readFileSync(schemaFilePath, 'utf-8');
    return JSON.parse(schema);
}

var extractText = function (str) {
    return str.substr(1, str.length - 2);
}

var prepareQuery = function (query) {
    var ch = query.trim();
    ch = ch.replace(/\s+/g, ' ');
    ch = ch.replace(/\s,\s/g, ',');
    ch = ch.replace(/\s,/g, ',');
    ch = ch.replace(/,\s/g, ',');
    return ch;
}

var schemaHasField = function (schema, field) {
    /**It is commonly agreed that primary keys should be immutable
     * So in our case we can only update fields (not the pk)
     * If we wanna consider this option (updating the pk), this if should do the thing.
     * if (schema.primaryKey === field)
     *   return true;
    */
    for (let i = 0; i < schema.fields.length; i++) {
        if (schema.fields[i].fieldName === field)
            return true;
    }
    return false;
}

module.exports = {
    displayItems: displayItems,
    displayItem: displayItem,
    exists: exists,
    indexOfItem: indexOfItem,
    fieldExists: fieldExists,
    getSchema: getSchema,
    extractText: extractText,
    prepareQuery: prepareQuery,
    schemaHasField: schemaHasField
}