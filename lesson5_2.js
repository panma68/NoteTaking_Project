// Using the module
// 1.
const {add} = require("./lesson5_1");

// 2
import {mul} from "./lesson5_1";

console.log(add(2,3));
console.log(mul(2,3));
// module.exports ---> allows us to specify what gets exported from mathUtils.js.
// require        ---> is used in app.js to import the exported functions.