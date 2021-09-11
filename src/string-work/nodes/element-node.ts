import { StringWorkElement } from "../constants";
import TAG_NAME = StringWorkElement.TAG_NAME;

/**
 * Returns false if ElementNode has been replaced or is a
 * String-Work-Element => It is not necessary to look at children
 * @param liveElementNode
 * @param virtualElementNode
 */
const updateElementNode = (
    elementNode: Element,
    virtualElementNode: Element
): boolean => {
    if (!hasSameTagName(elementNode, virtualElementNode)) {
        replaceElementNode(elementNode, virtualElementNode);
        return false;
    }
    if (isStringWorkElement(elementNode)) {
        return false;
    }
    updateElementNodeAttributes(elementNode, virtualElementNode);
    updateElementNodeProperties(elementNode, virtualElementNode);
    return true;
};

/**
 * Updates or deletes attributes on liveElementNode
 * @param elementNode
 * @param virtualElementNode
 */
const updateElementNodeAttributes = (
    elementNode: Element,
    virtualElementNode: Element
) => {
    // If element type is the same loop trough all attributes
    for (let i = 0; i < virtualElementNode.attributes.length; i++) {
        const attribute = virtualElementNode.attributes[i];
        if (attribute.specified) {
            console.log(attribute.name, attribute.value);
            elementNode.setAttribute(attribute.name, attribute.value);
        } else {
            elementNode.removeAttribute(attribute.name);
        }
    }
};

/**
 * Loops through virtualElementNode properties
 * And updates editable ones on elementNode
 * @param elementNode
 * @param virtualElementNode
 */
const updateElementNodeProperties = (
    elementNode: Element,
    virtualElementNode: Element
) => {
    if (elementNode.value !== virtualElementNode.value) {
        elementNode.value = virtualElementNode.value;
    }
    if (elementNode.className !== virtualElementNode.className) {
        elementNode.className = virtualElementNode.className;
    }
};

/**
 * Replaces the complete liveElementNode with the virtualElementNode
 * @param liveElementNode
 * @param virtualElementNode
 */
const replaceElementNode = (
    elementNode: Element,
    virtualElementNode: Element
): void => {
    elementNode.replaceWith(virtualElementNode);
};

const isStringWorkElement = (elementNode: Element) => {
    return elementNode.tagName === TAG_NAME;
};

const hasSameTagName = (
    elementNode: Element,
    virtualElementNode: Element
): boolean => {
    return elementNode.tagName === virtualElementNode.tagName;
};

export { updateElementNode };
