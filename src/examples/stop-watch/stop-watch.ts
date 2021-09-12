import Component from "../../string-work/component";
import Button from "../button/button";
import { c } from "../../string-work/string-work-dom";

type State = {
    milliseconds: number;
    running: boolean;
};

export default class StopWatch extends Component<any, State> {
    interval: any;
    constructor(props: any) {
        super(props);

        this.state = {
            milliseconds: 0,
            running: false,
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps: any, prevState: State) {
        if (this.state.running && !prevState.running) {
            this.interval = setInterval(
                () =>
                    this.setState({
                        milliseconds: this.state.milliseconds + 10,
                    }),
                10
            );
        }

        if (!this.state.running && prevState.running) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { minutes, seconds, ms } = millisecondsToUnits(
            this.state.milliseconds
        );

        return `
            <div class="card" style="width: 18rem; margin-bottom: 12px;">
                <div class="card-body">
                <h3 class="card-title">
                    ${toTwoDigitString(minutes)}:${toTwoDigitString(
            seconds
        )}.${toTwoDigitString(ms)}</h3>
                ${c(Button, {
                    key: "start",
                    callback: () => this.setState({ running: true }),
                    text: "Start",
                })}
                ${c(Button, {
                    key: "stop",
                    callback: () => this.setState({ running: false }),
                    text: "Stop",
                })}
                ${c(Button, {
                    key: "reset",
                    callback: () => this.setState({ milliseconds: 0 }),
                    text: "Reset",
                })}
                </div>
            </div>

        `;
    }
}

const toTwoDigitString = (number: number): string => {
    if (number >= 100) return number.toString().substr(0, 2);
    if (number < 10) return "0" + number;
    return number.toString();
};

const millisecondsToUnits = (ms: number): any => {
    /**
     * Takes as many whole units from the time pool (ms) as possible
     * @param {int} msUnit - Size of a single unit in milliseconds
     * @return {int} Number of units taken from the time pool
     */
    const allocate = (msUnit: number) => {
        const units = Math.trunc(ms / msUnit);
        ms -= units * msUnit;
        return units;
    };
    // Property order is important here.
    // These arguments are the respective units in ms.
    return {
        // weeks: (604800000), // Uncomment for weeks
        days: allocate(86400000),
        hours: allocate(3600000),
        minutes: allocate(60000),
        seconds: allocate(1000),
        ms: ms, // remainder
    };
};
