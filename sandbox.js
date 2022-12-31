const {VM,NodeVM} = require('vm2');



// const CreateProtectedProxy =(name,ctx={})=>{ 
//     return new Proxy(ctx,{
//     get(target,prop){
//         throw new Error(`You are not allowed to use ${prop}!`);
//     }
//     })
// };
// (function protected(window=CreateProtectedProxy('window'),globalThis=CreateProtectedProxy('globalThis'),console=CreateProtectedProxy('console')){
//     ;${codes};
// })()
// console.log(CreateProtectedProxy());


// (new Function(...black_list,`
//     ;${codes};
// `))()

module.exports.createVM= function createVM(sandbox={},timeout=1000,allowAsync=false,preprocess=""){
    const vm = new VM({
        timeout,
        allowAsync,
        eval:false,
        sandbox,
    })
    if(preprocess)vm.run(preprocess);
    return function run(codes){
        codes = `const CreateProtectedProxy =(name,ctx={})=>{ 
            return new Proxy(ctx,{
            get(target,prop){
                throw new Error(\`You are not allowed to use \${name}.\${prop}!\`);
            }
            })
        };
        (function protected(window=CreateProtectedProxy('window'),globalThis=CreateProtectedProxy('globalThis'),console=CreateProtectedProxy('console')){
            ;${codes};
        })()`
        vm.run(codes);
    }
}



// module.exports.createVM= function createVM(sandbox={},timeout=1000,allowAsync=false,preprocess=""){
//     sandbox.black_list = ['console'];
//     const vm = new NodeVM({
//         console:"off",
//         require:false,
//         timeout,
//         wasm:false,
//         allowAsync,
//         eval:false,
//         sandbox,
//     })
//     if(preprocess)vm.run(preprocess);
//     return function run(codes){
//         codes=`(new Function(${...black_list},
//         ${"\n"+codes+"\n"}
//     ))()`
//     console.log(codes);
//         vm.run(codes);
//     }
// }