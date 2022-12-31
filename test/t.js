const { createVM } =require( "./s");

const sandBox = {
    print(...args){
        console.log(...args);
    },
    sum(...args){
        return args.reduce((p,c)=>(p+c),0);
    }
}

const run = createVM(sandBox);

const codes =[ `
    while(true){};
`,//TLE
`
    setTimeout(()=>test("hi"),1000);
`,//reference error
`
    print(console);
`,//error: you are not allowed to use console
`
    print(sum(1,2,3,4,5,6,7,8,9,10));
`//log: 55
];

codes.forEach((code,i)=>{
    try{
        run(code);
    }catch(e){
        console.log(`at code ${i}, error = ${e.message}`);
    }
})