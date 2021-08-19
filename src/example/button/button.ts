import Component from "../../string-work/component";

type Props = {
    onClick: Function;
};

export default class Button extends Component {
    constructor(props: Props, key: string) {
        super(props, key);
    }

    render() {
        return `
Millis on creation ${new Date().getMilliseconds().toString()}
        <button type="button" class="btn btn-primary" onclick="${
            this.self
        }.props.callback()">Update parent time</button>
`;
    }
}
