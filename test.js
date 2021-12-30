let modules = 'hello';

function helloWorld(m){
 return m+'world';
}
const val = helloWorld(modules)
modules = val;

console.log(modules);