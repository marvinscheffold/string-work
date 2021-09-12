const updateTextNode = (textNode: Text, virtualTextNode: Text) => {
    if (textNode.textContent !== virtualTextNode.textContent) {
        textNode.textContent = virtualTextNode.textContent;
    }
};

export { updateTextNode };
