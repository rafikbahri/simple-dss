/** 
 * This module is the storage module.
 * It lets us CRUD our Data Storage System
 * The Data Storage System is simple (for now)
 * schemas folder contains the schemas of our DSS 
 * data folder contains the data of each Entity in our DSS
 * Both data and schemas file are in JSON Format (It's optimal in Read/Write ops, and it's handy with JS :p )
*/

var fs = require('fs');
var utils = require('../utils/utils');
var declareSchema = function (schemaName, args) {
    const schemaFilePath = __dirname + '/schemas/' + schemaName + '.json';
    var schema = { primaryKey: args[0], fields: [] };
    for (let i = 1; i < args.length; i++) {
        if (args[i] !== "")
            schema.fields.push({ index: i, fieldName: args[i] });
    }
    fs.writeFileSync(schemaFilePath, JSON.stringify(schema));
    return true;
}

var addToSchema = function (schemaName, args) {
    const schemaFilePath = __dirname + '/schemas/' + schemaName + '.json';
    if (fs.existsSync(schemaFilePath)) {
        const dataFilePath = __dirname + '/data/' + schemaName + '_data.json';
        var schema = utils.getSchema(schemaFilePath);
        if (fs.existsSync(dataFilePath)) {

            //Schema and passed values are incompatible
            if (schema.fields.length + 1 != args.length)
                return false;
            var file = fs.readFileSync(dataFilePath, 'utf-8');
            var dataFileContent = JSON.parse(file);
            if (utils.exists(dataFileContent, schema.primaryKey, utils.extractText(args[0])))
                return false;
            var data = new Object();
            data[schema.primaryKey] = utils.extractText(args[0]);
            for (let i = 0; i < schema.fields.length; i++) {
                data[schema.fields[i].fieldName] = utils.extractText(args[i + 1]);
            }
            dataFileContent.push(data);
            fs.writeFileSync(dataFilePath, JSON.stringify(dataFileContent));

        } else {
            var dataFileContent = [];
            var data = new Object();
            data[schema.primaryKey] = utils.extractText(args[0]);
            for (let i = 0; i < schema.fields.length; i++) {
                data[schema.fields[i].fieldName] = utils.extractText(args[i + 1]);
            }
            dataFileContent.push(data);
            fs.writeFileSync(dataFilePath, JSON.stringify(dataFileContent));

        }
        return true;
    }
}




var deleteFromSchema = function (schemaName, id) {
    const schemaFilePath = __dirname + '/schemas/' + schemaName + '.json';
    if (fs.existsSync(schemaFilePath)) {
        const dataFilePath = __dirname + '/data/' + schemaName + '_data.json';
        if (fs.existsSync(dataFilePath)) {
            var schema = utils.getSchema(schemaFilePath);
            var file = fs.readFileSync(dataFilePath, 'utf-8');
            var dataFileContent = JSON.parse(file);
            id = utils.extractText(id);
            //File is empty
            if (dataFileContent.length === 0) {
                return false;
            }
            //Item does not exist
            if (!utils.exists(dataFileContent, schema.primaryKey, id)) {
                return false;
            }
            dataFileContent = dataFileContent.filter(item => {
                return item[schema.primaryKey] !== id;
            });
            fs.writeFileSync(dataFilePath, JSON.stringify(dataFileContent));
            return true;
        }
    }
    return false;
}

var findInSchema = function (schemaName, id) {
    const schemaFilePath = __dirname + '/schemas/' + schemaName + '.json';
    if (fs.existsSync(schemaFilePath)) {
        const dataFilePath = __dirname + '/data/' + schemaName + '_data.json';
        if (fs.existsSync(dataFilePath)) {
            var schema = utils.getSchema(schemaFilePath);
            var file = fs.readFileSync(dataFilePath, 'utf-8');
            var dataFileContent = JSON.parse(file);
            //FIND ALL
            if (id.toUpperCase() === 'ALL') {
                //File is empty

                if (dataFileContent.length !== 0) {
                    utils.displayItems(dataFileContent, schema);
                }
                return true;
            } else {
                //FIND id
                id = utils.extractText(id);
                //Check if item exists
                if (utils.exists(dataFileContent, schema.primaryKey, id)) {
                    var item = dataFileContent.filter(obj => obj[schema.primaryKey] == id)[0];
                    utils.displayItem(item, schema);
                    return true;
                }
            }

        }
        return false;
    }
    return false;
}

var updateSchema = function (schemaName, id, field, value) {
    const schemaFilePath = __dirname + '/schemas/' + schemaName + '.json';
    if (fs.existsSync(schemaFilePath)) {
        const dataFilePath = __dirname + '/data/' + schemaName + '_data.json';
        if (fs.existsSync(dataFilePath)) {
            var schema = utils.getSchema(schemaFilePath);
            if (!utils.schemaHasField(schema, field)) {
                return false;
            }
            var file = fs.readFileSync(dataFilePath, 'utf-8');
            var dataFileContent = JSON.parse(file);
            id = utils.extractText(id);
            value = utils.extractText(value);
            var index = utils.indexOfItem(dataFileContent, schema.primaryKey, id);
            if (index === -1) {
                return false;
            }
            dataFileContent[index][field] = value;
            fs.writeFileSync(dataFilePath, JSON.stringify(dataFileContent));

            return true;
        }
        return false;
    }
}



module.exports = {
    declareSchema: declareSchema,
    addToSchema: addToSchema,
    deleteFromSchema: deleteFromSchema,
    findInSchema: findInSchema,
    updateSchema: updateSchema
};