const { createVM } = require("./sandbox");

const run = createVM({
    test(c){
        console.log(c);
    },
    add(a,b){
        return a+b;
    }
});

code = `
    const a=5,b=5;
    // test(add(a,b));
    test(add(a,b));
    test(console);
    // test(window);
    // setTimeout(()=>test("hi"),1000);
`;

run(code);
