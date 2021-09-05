import Component from "../../string-work/component";
import TemperatureInput from "./temperature-input";
import { c } from "../../string-work/string-work-dom";

type State = {
    value: string;
    scale: string;
};

export default class TemperatureConverter extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = { value: "23", scale: "c" };
    }

    handleCelsiusChange(value: string) {
        this.setState({ scale: "c", value });
    }

    handleFahrenheitChange(value: string) {
        this.setState({ scale: "f", value });
    }

    render() {
        const scale = this.state.scale;
        const value = this.state.value;
        const celsius = scale === "f" ? tryConvert(value, toCelsius) : value;
        const fahrenheit =
            scale === "c" ? tryConvert(value, toFahrenheit) : value;
        return `
            ${c(
                TemperatureInput,
                {
                    label: "Celcius",
                    onChange: (value: string) =>
                        this.handleCelsiusChange(value),
                    value: celsius,
                    key: "celcius",
                },
                this
            )} 
            ${c(
                TemperatureInput,
                {
                    label: "Fahrenheit",
                    onChange: (value: string) =>
                        this.handleFahrenheitChange(value),
                    value: fahrenheit,
                    key: "fahrenheit",
                },
                this
            )}
        `;
    }
}

function toCelsius(fahrenheit: number) {
    return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius: number) {
    return (celsius * 9) / 5 + 32;
}

function tryConvert(value: string, convert: Function) {
    const input = parseFloat(value);
    if (Number.isNaN(input)) {
        return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
