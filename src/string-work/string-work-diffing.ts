import Component from "./component";
import {
    createVirtualComponentChildNodes,
    getComponentChildNodes,
    getComponentShellNode,
} from "./string-work-helper";
import { updateElementNode } from "./element-node";
import { updateTextNode } from "./text-node";

const updateComponentNodes = (component: Component, nextHtml: string) => {
    // The node of the html component wrapper
    const parentNode = getComponentShellNode(component);
    // The current state of the component in the Dom
    const childNodes = getComponentChildNodes(component);
    // The next state the component should be in
    const virtualChildNodes = createVirtualComponentChildNodes(nextHtml);
    updateChildNodes(childNodes, virtualChildNodes, parentNode);
};

const updateChildNodes = (
    childNodes: NodeList,
    virtualChildNodes: NodeList,
    parentNode: Node
) => {
    let maximumNumberOfNodes = Math.max(
        virtualChildNodes.length,
        childNodes.length
    );

    for (let i = 0; i < maximumNumberOfNodes; i++) {
        const childNode = childNodes[i];
        const virtualChildNode = virtualChildNodes[i];

        if (childNode !== undefined && virtualChildNodes !== undefined) {
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
    if (shouldReplaceNode(node, virtualNode)) {
        parentNode.replaceChild(node, virtualNode);
        // Return here -> no need to look through children
        // Whole node has been replaced
        return;
    }

    switch (virtualNode.nodeType) {
        // element node
        case 1:
            let replacedElementNode = !updateElementNode(
                <Element>node,
                <Element>virtualNode
            );
            if (replacedElementNode) {
                // Return here -> no need to look through children
                // Element node has been replaced
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

const shouldReplaceNode = (node: Node, virtualNode: Node): boolean => {
    return node.nodeType !== virtualNode.nodeType;
};

export { updateComponentNodes };
