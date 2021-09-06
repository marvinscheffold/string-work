type Props = {
    text: string;
};

export function ListItem(props: Props) {
    return `<li class="list-group-item">${props.text}</li>`;
}
