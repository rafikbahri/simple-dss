/** 
 * The main module of our app
*/
var app=function () {
    var stdin = process.openStdin();

var interpreter = require('./query-interpreter/interpreter');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('> '.blue);
console.log('Welcome to SDSS, \n>wanna get some help? Quit this console and write node sdss --help \nto quit just type quit\n'.magenta.bold);
console.log('NOTE: SDSS is not case sensitive (like SQL), this means that add is the same as Add,ADD ..'.yellow.bold);

rl.prompt();
rl.on('line', function (line) {
    if (interpreter.isDeclare(line)) {
        console.log('* OK'.green);
    } else if (interpreter.isAdd(line)) {
        console.log('* OK'.green);
    } else if (interpreter.isDelete(line)) {
        console.log('* OK'.green)
    } else if (interpreter.isFind(line)) {

    } else if (interpreter.isUpdate(line)) {
        console.log('* OK'.green);
    } else if (line.toUpperCase() === "QUIT") {
        console.log('\nYou\'ve just quitted SDSS..'.red.bold);
        
        rl.close();
    }
    else {
        console.error('* Error'.red);
    }



    rl.prompt();
}).on('close', function () {
    process.exit(0);
});
}

module.exports=app;