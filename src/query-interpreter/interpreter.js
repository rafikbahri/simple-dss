var storage = require('../storage-system/storage');
var utils = require('../utils/utils');

var isDeclare = function (query) {
    var ch = utils.prepareQuery(query);
    var keywords = ch.split(" ");
    if (keywords[0].toUpperCase() === "DECLARE" && keywords[2].toUpperCase() === "AS") {
        var schemaName = keywords[1];
        var tmp = keywords[3].replace(/\s/g, '');
        var fields = tmp.split(",");
        var declared = storage.declareSchema(schemaName, fields);
        return declared;
    }
    return false;
}

var isAdd = function (query) {
    var ch = utils.prepareQuery(query);
    var keywords = ch.split(" ");
    if (keywords[0].toUpperCase() === "ADD" && keywords[2].toUpperCase() === "TO") {
        var valuesStr = keywords[1].substr(1, keywords[1].length - 2);
        var values = valuesStr.split(",");
        var schemaName = keywords[3];
        var added = storage.addToSchema(schemaName, values);
        return added;
    }
    return false;
}


var isDelete = function (query) {
    var ch = utils.prepareQuery(query);
    var keywords = ch.split(" ");
    if (keywords[0].toUpperCase() === "DELETE" && keywords[2].toUpperCase() === "FROM") {
        var id = keywords[1];
        var schemaName = keywords[3];
        var deleted = storage.deleteFromSchema(schemaName, id);
        return deleted;
    }
    return false;
}

var isFind = function (query) {
    var ch = utils.prepareQuery(query);
    var keywords = ch.split(" ");
    if (keywords[0].toUpperCase() === "FIND" && keywords[2].toUpperCase() === "IN") {
        var id = keywords[1];
        var schemaName = keywords[3];
        var found = storage.findInSchema(schemaName, id);
        return found;
    }
    return false;
}

var isUpdate = function (query) {
    var ch = utils.prepareQuery(query);
    var keywords = ch.split(" ");
    if (keywords[0].toUpperCase() === "UPDATE"
        && keywords[2].toUpperCase() === "IN"
        && keywords[4].toUpperCase() === "SET"
    ) {
        var id = keywords[1];
        var schemaName = keywords[3];
        var tmp = keywords[5].split("=");
        var field = tmp[0];
        var value = tmp[1];
        var updated = storage.updateSchema(schemaName, id, field, value);
        return updated;
    }
    return false;
}


module.exports = {
    isDeclare: isDeclare,
    isAdd: isAdd,
    isDelete: isDelete,
    isFind: isFind,
    isUpdate: isUpdate
}
