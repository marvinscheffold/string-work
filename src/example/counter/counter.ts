import Component from "../../string-work/component";
import { component } from "../../string-work/string-work-dom";
import Button from "../button/button";

type State = {
    count: number;
};

export default class Counter extends Component<any, State> {
    constructor(props: any, key: string) {
        super(props, key);

        this.state = {
            count: 0,
        };
    }

    render() {
        return `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">Current Count: ${this.state.count}</h5>
            ${component(
                Button,
                {
                    callback: () =>
                        this.setState({ count: ++this.state.count }),
                    text: "+",
                },
                "KEY2"
            )}
            ${component(
                Button,
                {
                    callback: () =>
                        this.setState({ count: --this.state.count }),
                    text: "-",
                },
                "KEY3"
            )}
            </div>
        </div>
        `;
    }
}
