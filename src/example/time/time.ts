import Component from "../../string-work/component";
import { component } from "../../string-work/string-work-dom";
import Button from "../button/button";

type State = {
    time: string;
    millisOnCreation: string;
};

export default class Time extends Component {
    state: State;
    constructor(props: any, key: string) {
        super(props, key);

        this.state = {
            time: new Date().getMilliseconds().toString(),
            millisOnCreation: new Date().getMilliseconds().toString(),
        };
    }

    handleButtonClick() {
        this.setState({ time: new Date().getMilliseconds().toString() });
    }

    render() {
        return `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">Millis on creation: ${
                this.state.millisOnCreation
            }</h5>
            <p class="card-text">Millis now: ${this.state.time}</p>
            ${component(
                Button,
                { callback: () => this.handleButtonClick() },
                "KEY2"
            )}
            </div>
        </div>
        `;
    }
}
