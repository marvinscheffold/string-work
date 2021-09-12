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
    for (let i = 0; i < virtualElementNode.attributes.length; i++) {
        const virtualElementAttribute = virtualElementNode.attributes[i];

        if (
            !virtualElementAttribute.specified &&
            elementNode.hasAttribute(virtualElementAttribute.name)
        ) {
            elementNode.removeAttribute(virtualElementAttribute.name);
            continue;
        }

        if (
            virtualElementAttribute.value !==
            elementNode.getAttribute(virtualElementAttribute.name)
        ) {
            elementNode.setAttribute(
                virtualElementAttribute.name,
                virtualElementAttribute.value
            );
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
    // Solving the problem of special attributes that wont update UI
    // When simply updated via setAttribute(... , ...);
    // Namely: value and className
    if (elementNode.value !== virtualElementNode.value)
        elementNode.value = virtualElementNode.value;

    if (elementNode.className !== virtualElementNode.className)
        elementNode.className = virtualElementNode.className;
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
