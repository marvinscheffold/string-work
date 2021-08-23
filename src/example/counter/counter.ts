import Component from "../../string-work/component";
import Button from "../button/button";
import { c } from "../../string-work/string-work-dom2";

type State = {
    count: number;
};

export default class Counter extends Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            count: 0,
        };
    }

    render() {
        return `
            <div class="card" style="width: 18rem; margin-bottom: 12px;">
                <div class="card-body">
                <h5 class="card-title">Current Count: ${this.state.count}</h5>
                ${c(Button, {
                    callback: () =>
                        this.setState({ count: this.state.count - 1 }),
                    text: "-",
                })}
                ${c(Button, {
                    callback: () =>
                        this.setState({ count: this.state.count + 1 }),
                    text: "+",
                })}
               
                </div>
            </div>

        `;
    }
}
