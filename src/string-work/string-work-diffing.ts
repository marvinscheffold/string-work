import Component from "./component";
import {
    createVirtualComponentNodes,
    getLiveComponentNodes,
} from "./string-work-helper";
import { updateElementNode } from "./element-node";

const updateComponentObjectModel = (component: Component, nextHtml: string) => {
    // The current state of the component in the Dom
    const liveComponentNodes = getLiveComponentNodes(component);
    // The next state the component should be in
    const virtualComponentNodes = createVirtualComponentNodes(nextHtml);
    updateComponentNodes(liveComponentNodes, virtualComponentNodes);
};

const updateComponentNodes = (
    liveComponentNodes: NodeList,
    virtualComponentNodes: NodeList
) => {};

const insertComponentNode = () => {};

const removeComponentNode = () => {};

const updateComponentNode = (
    liveComponentNode: Node,
    virtualComponentNode: Node
) => {
    if (virtualComponentNode.nodeType !== liveComponentNode.nodeType) {
        liveComponentNode.parentNode.replaceChild(
            liveComponentNode,
            virtualComponentNode
        );
        // return here -> no need to look through children
        return;
    }

    let continueTraversing = false;

    switch (virtualComponentNode.nodeType) {
        // element node
        case 1:
            continueTraversing = updateElementNode(
                <Element>liveComponentNode,
                <Element>virtualComponentNode
            );
            break;
        // attribute node
        case 2:
            break;
        // text node
        case 3:
            break;
        // comment node
        case 8:
            break;
    }

    if (continueTraversing) {
        updateComponentNodes(
            liveComponentNode.childNodes,
            virtualComponentNode.childNodes
        );
    }
};

const traverseComponentNode = (liveDomNode: Node, virtualDomNode: Node) => {};

export { updateComponentObjectModel };
