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

export {
    getComponentShellNode,
    getComponentChildNodes,
    createVirtualComponentChildNodes,
    createComponentHtmlShell,
};
