const updateTextNode = (textNode: Text, virtualTextNode: Text) => {
    textNode.textContent = virtualTextNode.textContent;
};

export { updateTextNode };
