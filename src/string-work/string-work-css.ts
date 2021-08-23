import { component } from "./constants";
import TAG = component.TAG;

export function addStringWorkCSSToDOM() {
    const styleTag = document.createElement("style");
    styleTag.appendChild(document.createTextNode(`${TAG}{display:contents;}`));
    document.getElementsByTagName("head")[0].appendChild(styleTag);
}
