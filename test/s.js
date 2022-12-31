// const {VM}=require('vm2');

// const addBlackList = `
//     const window = CreateProtectedProxy('window');
//     const globalThis = CreateProtectedProxy('globalThis');
//     const console = CreateProtectedProxy('console');
//     const Object = CreateProtectedProxy('Object');
// `;

// module.exports.createVM= function createVM(
//         sandbox = {}, 
//         timeout = 1000, 
//         allowAsync = false,
//         preprocess="let CreateProtectedProxy;"){
//     // sandbox._CreateProtectedProxy = function(name,ctx={
//     // }){ //maybe add some protection to this method later...
//     //     return new Proxy(ctx,{
//     //         get(target,prop){
//     //             throw new Error(`You are not allowed to use ${prop? name:name+'.'+prop}!`);
//     //         }
//     //     });
//     // };
//     const vm = new VM({
//         timeout,
//         allowAsync,
//         eval:false,
//         sandbox,
//     });
//     if(preprocess)vm.run(preprocess);
//     return function run(codes){
//         codes = `CreateProtectedProxy =(name,ctx={})=>{ 
//             return new Proxy(ctx,{
//             get(target,prop){
//                 throw new Error(\`You are not allowed to use "\${prop==="0"? name:name+'.'+prop}"!\`);
//             }
//             })
//         };
//         (function protected(){
//             ;${addBlackList};
//             ;${codes};
//         })()`
//         vm.run(codes);
//     }
// }


const {VM}=require( 'vm2');

const addBlackList = `
    const window = _CreateProtectedProxy('window');
    const globalThis = _CreateProtectedProxy('globalThis');
    const console = _CreateProtectedProxy('console');
    const Object = _CreateProtectedProxy('Object');
    _CreateProtectedProxy=null;
`;

module.exports.createVM= function createVM(
        sandbox = {}, 
        timeout = 1000, 
        allowAsync = false,
        preprocess=""){
    sandbox._CreateProtectedProxy = function(name,ctx={}){ //maybe add some protection to this method later...
        return new Proxy(ctx,{
            get(target,prop){
                throw new Error(`You are not allowed to use ${name}.${prop}!`);
            }
        });
    };
    const vm = new VM({
        timeout,
        allowAsync,
        eval:false,
        sandbox,
    });
    if(preprocess)vm.run(preprocess);
    return function run(codes){
        codes = `_CreateProtectedProxy =(name,ctx={})=>{ 
            return new Proxy(ctx,{
            get(target,prop){
                throw new Error(\`You are not allowed to use "\${prop==="0"? name:name+'.'+prop}"!\`);
            }
            })
        };
        (function protected(){
            ;${addBlackList};
            ;${codes};
        })()`
        vm.run(codes);
    }
}