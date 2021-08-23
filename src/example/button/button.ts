import Component from "../../string-work/component";

type Props = {
    callback: Function;
    text: string;
};

export default class Button extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return `
            <button type="button" class="btn btn-primary" onclick="${this.self}.props.callback()">${this.props.text}</button>
`;
    }
}
