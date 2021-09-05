/**
 * Returns false if ElementNode has been replaces
 * And it is not necessary to keep traversing through children
 * @param liveElementNode
 * @param virtualElementNode
 */
const updateElementNode = (
    liveElementNode: Element,
    virtualElementNode: Element
): boolean => {
    if (shouldReplaceElementNode(liveElementNode, virtualElementNode)) {
        replaceElementNode(liveElementNode, virtualElementNode);
        return false;
    }
    updateElementNodeAttributes(liveElementNode, virtualElementNode);
    return true;
};

/**
 * Updates or deletes attributes on liveElementNode
 * @param liveElementNode
 * @param virtualElementNode
 */
const updateElementNodeAttributes = (
    liveElementNode: Element,
    virtualElementNode: Element
) => {
    // If element type is the same loop trough all attributes
    for (let i = 0; i < virtualElementNode.attributes.length; i++) {
        let attribute = virtualElementNode.attributes[i];
        if (attribute.specified) {
            liveElementNode.setAttribute(attribute.name, attribute.value);
        } else {
            liveElementNode.removeAttribute(attribute.name);
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
    return liveElementNode.tagName === virtualElementNode.tagName;
};

export { updateElementNode };
