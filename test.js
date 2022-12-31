const {VM} = require('vm2');

// const CreatectxProxy = (ctx, access_white_list)=>new Proxy(ctx, {
//     has: (target, prop) => { // has 可以攔截 with 代碼塊中任意屬性的訪問
//       if (access_white_list.includes(prop)) { // 在可訪問的白名單內，可繼續向上查找
//           return target.hasOwnProperty(prop)
//       }
  
//       if (!target.hasOwnProperty(prop)) {
//           throw new Error(`Invalid expression - ${prop}! You can not do that!`)
//       }
  
//       return true
//     }
//   })

const sandbox = new Proxy({},{
    has:()=>{
        throw new Error(`nothing`);
        return true;
    },
    get:()=>{
        throw new Error(`get nothing`);
    },
    ownKeys(target) {
        throw new Error(`own nothing`);
      }
});


// const CreatectxProxy = (ctx, access_white_list,access_once)=>{
//     return new Proxy(ctx, {
//     has: (target, prop) => { // has 可以攔截 with 代碼塊中任意屬性的訪問
//       if (access_white_list.includes(prop)) { // 在可訪問的白名單內，可繼續向上查找
//           return target.hasOwnProperty(prop)
//       }
  
//       if (!target.hasOwnProperty(prop)) {
//           throw new Error(`Invalid expression - ${prop}! You can not do that!`)
//       }
  
//       return true
//     },
//     get: (target,prop)=>{
//         if (access_white_list.includes(prop)) { // 在可訪問的白名單內，可繼續向上查找
//             // return target.getOwnProperty(prop)
//             return globalThis[prop];
//         }
//         if(access_once.includes(prop)){
//             access_once.splice(access_once.findIndex(prop),1);
//             return globalThis[prop];
//         }
    
//         if (!target.hasOwnProperty(prop)) {
//             throw new Error(`Invalid expression - ${prop}! You can not do that!`)
//         }
    
//         return target[prop];
//     },
//     ownKeys(target){
//         return Object.keys(target).concat(Object.getOwnPropertyNames(globalThis));
//     },
//     getOwnPropertyDescriptor(target, prop) { // called for every property
//         return {
//           enumerable: true,
//           configurable: true
//           /* ...other flags, probable "value:..." */
//         };
//       }
//   })
// }
// console.log(console in sandbox);


const  CreatectxProxy= (ctx={},black_list=[])=>{
    black_list.forEach((v)=>ctx[v]=null);
    return new Proxy(ctx, {
    has: (target, prop) => { // has 可以攔截 with 代碼塊中任意屬性的訪問
      if (black_list.includes(prop)) {
          throw new Error(`Invalid expression - ${prop}! You can not do that!`)
      }
      return true
    },
    get: (target,prop)=>{
        console.log(black_list.includes(prop),prop)
        if (black_list.includes(prop)) { // 在可訪問的白名單內，可繼續向上查找
            throw new Error(`Invalid expression - ${prop}! You can not do that!`)
        }
        return target[prop];
    },
    ownKeys(target){
        return Object.keys(target);
    },
    // getOwnPropertyDescriptor(target, prop) { // called for every property
    //     return {
    //       enumerable: true,
    //       configurable: true
    //       /* ...other flags, probable "value:..." */
    //     };
    //   }
  })
}
// "globalThis","window",

const vm = new VM({
    console:"off",
    timeout: 1000,
    allowAsync: false,
    eval:false,
    sandbox:{
        t(){
            while(true){}
        }
    }
});
// CreatectxProxy({},["Date"])



console.log(vm.run('t()')); // throws ReferenceError: process is not defined


// let cttx={};
// for(let i of Object.getOwnPropertyNames(globalThis)){
//     cttx.i=null;
// }

// function test(ctx){
//     console.log(console);
// }

// test(...cttx);