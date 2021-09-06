import Component from "./component";
import { StringWorkElement } from "./constants";
import DATA_KEY = StringWorkElement.DATA_KEY;
import TAG_NAME = StringWorkElement.TAG_NAME;

/**
 * Returns the component html shell
 * <string-work-element></string-work-element>
 * @param component
 */
const getComponentShellNode = (component: Component): Node => {
    return document.querySelector(`[${DATA_KEY}="${component.key}"]`);
};

/**
 * Returns current list of dom nodes for passed component
 * @param component
 */
const getComponentChildNodes = (component: Component): NodeList => {
    return document.querySelector(`[${DATA_KEY}="${component.key}"]`)
        .childNodes;
};

/**
 * Returns a list of nodes rendered out of the passed html string
 * @param html
 */
const createVirtualComponentChildNodes = (html: string): NodeList => {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content.childNodes;
};

/**
 * Returns the Html shell in which the actuall component nodes
 * Will be inserted. This shell will always stay the same and is very important
 * for string-work to recognize components
 * @param component
 */
const createComponentHtmlShell = (component: Component): string => {
    return `<${TAG_NAME} ${DATA_KEY}="${component.key}"></${TAG_NAME}>`;
};

/**
 * Used for generating component key out of component props,
 * component definition and parent context
 * @param str
 */
const getHash = (str: string): string => {
    let hash = 0,
        i,
        char;

    if (str.length === 0) return hash.toString().trim();
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString().trim();
};

export {
    getComponentShellNode,
    getComponentChildNodes,
    createVirtualComponentChildNodes,
    createComponentHtmlShell,
    getHash,
};
