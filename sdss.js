/** 
 * The Entry point
*/
var program = require('commander');
var colors = require('colors');
var app = require('./src/app');

const valid_queries = `
To DECLARE a new schema
DELETE PRIMARY_KEY_VALUE FROM ENTITY_NAME
---
To ADD a new item:  
ADD (FIELD1, [[FIELD2], FIELD3]) TO ENTITY_NAME
---
To DELETE an item:
DELETE PRIMARY_KEY_VALUE FROM ENTITY_NAME
---
To FIND (retrieve) an item or ALL items:
FIND [PRIMARY_KEY_VALUE | ALL] IN ENTITY_NAME
---
To UPDATE an item:
UPDATE PRIMARY_KEY_VALUE IN ENTITY_NAME SET FIELDNAME=NEW_VALUE
` ;

program
    .version('0.1.0')
    .option('-q, --query ', `List of the valid queries`)
    .parse(process.argv);

if (program.query) {
    console.log('List of the valid queries in SDSS'.green.bold);
    console.log(valid_queries.blue);
    process.exit(0);

}
console.clear();
app();


