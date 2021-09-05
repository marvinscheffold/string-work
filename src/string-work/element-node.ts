/**
 * Returns false if ElementNode has been replaced
 * And it is not necessary to keep traversing through children
 * @param liveElementNode
 * @param virtualElementNode
 */
const updateElementNode = (
    elementNode: Element,
    virtualElementNode: Element
): boolean => {
    if (shouldReplaceElementNode(elementNode, virtualElementNode)) {
        replaceElementNode(elementNode, virtualElementNode);
        return false;
    }
    updateElementNodeAttributes(elementNode, virtualElementNode);
    return true;
};

/**
 * Updates or deletes attributes on liveElementNode
 * @param liveElementNode
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
            elementNode.setAttribute(attribute.name, attribute.value);
        } else {
            elementNode.removeAttribute(attribute.name);
        }
    }
};

/**
 * Replaces the complete liveElementNode with the virtualElementNode
 * @param liveElementNode
 * @param virtualElementNode
 */
const replaceElementNode = (
    liveElementNode: Element,
    virtualElementNode: Element
): void => {
    liveElementNode.replaceWith(virtualElementNode);
};

const shouldReplaceElementNode = (
    liveElementNode: Element,
    virtualElementNode: Element
): boolean => {
    return liveElementNode.tagName !== virtualElementNode.tagName;
};

export { updateElementNode };
