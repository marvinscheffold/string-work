import { StringWorkElement } from "./constants";
import TAG_NAME = StringWorkElement.TAG_NAME;

export function addStringWorkCSSToDOM() {
    const styleTag = document.createElement("style");
    styleTag.appendChild(
        document.createTextNode(`${TAG_NAME}{display:contents;}`)
    );
    document.getElementsByTagName("head")[0].appendChild(styleTag);
}
