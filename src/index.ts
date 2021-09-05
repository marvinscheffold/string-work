import { StringWorkDOM } from "./string-work/string-work-dom";
import App from "./examples/app";
import { c } from "./string-work/string-work-dom";

function main() {
    new StringWorkDOM().render(c(App), document.getElementById("root"));
}
main();
