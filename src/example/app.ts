import Component from "../string-work/component";
import { component } from "../string-work/string-work-dom";
import Counter from "./counter/counter";
import { v4 as uuid } from "uuid";
import Button from "./button/button";

type State = {
    clicked: boolean;
};

export default class App extends Component<any, State> {
    constructor(props: any, key: string) {
        super(props, key);
        this.state = {
            clicked: false,
        };
    }
    render(): string {
        return `
            <div class="container" style="padding-top: 24px">    
                ${component(Counter, null, "123")}
            </div>`;
    }
}
