var interpreter=require('../../src/query-interpreter/interpreter');

describe('Query Interpreter TESTs ',()=>{
    it("TESTING: DECLARE users AS firstname, lastname",()=>{
        console.log("TESTING: DECLARE users AS firstname, lastname");
        
        expect(interpreter.isDeclare("DECLARE users AS firstname, lastname")).toEqual(true);
    });

    it("TESTING: ADD ('Ali', 'Baba') TO users",()=>{
        console.log("TESTING: ADD ('Ali', 'Baba') TO users");
        
        expect(interpreter.isAdd("ADD ('Ali', 'Baba') TO users")).toEqual(true);
    });


    //OTHER TESTs to be implemented..

});