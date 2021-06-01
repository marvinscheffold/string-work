import StringWork, {component} from "./framework"
import Jumbo from "./components/jumbo/jumbo"
function main(){

    let framework = new StringWork();
    window.framework = framework;


    let students = [
        {name:"Jan",age:23},
        {name:"Maike",age:22}
    ]

    framework.render(component(Jumbo,{students:students}, "123"),document.getElementById("root"));

}

main();