import {initiateStringWork, component} from "./string-work"
import Parent from "./components/parent/parent"


function main(){

    let students = [
        {name:"hannes",age:23},
        {name:"maya",age:20},
        {name:"mike",age:1}
    ];

    let stringWork = initiateStringWork();
    stringWork.render(component(Parent,{students:students}, "KEY"),document.getElementById("root"));

}

main();