let modules = [];

function helloWorld(m){
  m.push('hello world')
  return m;
}
const [val] = helloWorld(modules)
modules = val;

console.log(modules);