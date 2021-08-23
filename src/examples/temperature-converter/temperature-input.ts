import Component from "../../string-work/component";

type Props = {
    onChange: Function;
    label: string;
    value: string;
};

export default class TemperatureInput extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value: string) {
        console.log("handleChange", value);
        this.props.onChange(value);
    }

    render() {
        const value = this.props.value;
        return `
            <h3>Enter Temperature in ${this.props.label}</h3>
            <input class="form-control form-control-lg" type="text" value="${this.props.value}" oninput="${this.self}.handleChange(this.value)"/>
        `;
    }
}
