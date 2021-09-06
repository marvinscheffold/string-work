import Component from "./component";
import {
    createVirtualComponentChildNodes,
    getComponentChildNodes,
    getComponentShellNode,
} from "./string-work-helper";
import { updateElementNode } from "./nodes/element-node";
import { updateTextNode } from "./nodes/text-node";

const updateComponentNodes = (component: Component, nextHtml: string) => {
    // The node of the html component wrapper
    const parentNode = getComponentShellNode(component);
    // The current state of the component in the Dom
    const childNodes = getComponentChildNodes(component);
    // The next state the component should be in
    const virtualChildNodes = createVirtualComponentChildNodes(nextHtml.trim());
    updateChildNodes(childNodes, virtualChildNodes, parentNode);
};

const updateChildNodes = (
    childNodes: NodeList,
    virtualChildNodes: NodeList,
    parentNode: Node
) => {
    let numberOfNodesToLookAt = Math.max(
        virtualChildNodes.length,
        childNodes.length
    );

    let childNodesArray = [];
    let virtualChildNodesArray = [];
    /*
     * We need to save each node reference individually in an
     * Array so that the removal of a node out of the dom
     * Does not infect the array length and we can
     * safely loop over it
     */
    for (let x = 0; x < numberOfNodesToLookAt; x++) {
        childNodesArray.push(childNodes[x]);
        virtualChildNodesArray.push(virtualChildNodes[x]);
    }

    for (let i = 0; i < numberOfNodesToLookAt; i++) {
        const childNode = childNodesArray[i];
        const virtualChildNode = virtualChildNodesArray[i];

        if (childNode !== undefined && virtualChildNode !== undefined) {
            updateNode(childNode, virtualChildNode, parentNode);
            continue;
        }
        if (childNode !== undefined && virtualChildNode === undefined) {
            removeNode(childNode, parentNode);
            continue;
        }
        if (childNode === undefined && virtualChildNode !== undefined) {
            insertNode(virtualChildNode, parentNode);
            continue;
        }
    }
};

const updateNode = (node: Node, virtualNode: Node, parentNode: Node) => {
    if (!hasSameNodeType(node, virtualNode)) {
        parentNode.replaceChild(virtualNode, node);
        // Return here -> no need to look through children
        // Whole node has been replaced
        return;
    }

    switch (virtualNode.nodeType) {
        // element node
        case 1:
            let updatedElementNode = updateElementNode(
                <Element>node,
                <Element>virtualNode
            );
            if (!updatedElementNode) {
                // Return here -> no need to look through children
                // Element node has been replaced completely or is string-work-element
                return;
            }
            break;
        // attribute node
        case 2:
            break;
        // text node
        case 3:
            updateTextNode(<Text>node, <Text>virtualNode);
            return;
            break;
        // comment node
        case 8:
            break;
    }

    updateChildNodes(node.childNodes, virtualNode.childNodes, node);
};

const insertNode = (node: Node, parentNode: Node) => {
    const newNode = node.cloneNode(true);
    parentNode.appendChild(newNode);
};

const removeNode = (node: Node, parentNode: Node) => {
    parentNode.removeChild(node);
};

const hasSameNodeType = (node: Node, virtualNode: Node): boolean => {
    return node.nodeType === virtualNode.nodeType;
};

export { updateComponentNodes };
