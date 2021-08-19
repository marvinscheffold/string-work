import {initiateStringWork, component} from "./string-work/virtual-dom"
import Time from "./example/time/time";


function main(){

    let stringWork = initiateStringWork();
    stringWork.render(component(Time,null, "KEY1"),document.getElementById("root"));

}

main();