import Component from "../../string-work/component";
import TemperatureInput from "./temperature-input";
import { c } from "../../string-work/string-work-dom";

type State = {
    value: number;
    scale: string;
};

export default class TemperatureConverter extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: 23,
            scale: "c",
        };
    }

    render() {
        const scale = this.state.scale;
        const value = this.state.value;
        const celsius = scale === "f" ? toCelsius(value) : value;
        const fahrenheit = scale === "c" ? toFahrenheit(value) : value;

        return `
            ${c(
                TemperatureInput,
                {
                    label: "Celcius",
                    onChange: (value: number) =>
                        this.setState({ scale: "c", value }),
                    value: celsius,
                    key: "celcius",
                },
                this
            )} 
            ${c(
                TemperatureInput,
                {
                    label: "Fahrenheit",
                    onChange: (value: number) =>
                        this.setState({ scale: "f", value }),
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
