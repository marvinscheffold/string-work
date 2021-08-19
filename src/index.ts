import StringWorkDOM, { component } from "./string-work/string-work-dom";
import App from "./example/app";

function main() {
    new StringWorkDOM().render(
        component(App, ["sdsd"], "KEY"),
        document.getElementById("root")
    );
}

main();
