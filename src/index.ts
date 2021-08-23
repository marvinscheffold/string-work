import { StringWorkDOM } from "./string-work/string-work-dom2";
import App from "./examples/app";
import { c } from "./string-work/string-work-dom2";

function main() {
    new StringWorkDOM().render(c(App), document.getElementById("root"));
}

main();
