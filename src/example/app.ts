import Component from "../string-work/component";
import { component } from "../string-work/string-work-dom";
import Counter from "./counter/counter";

export default class App extends Component {
    constructor(props: any, key: string) {
        super(props, key);
    }
    render(): string {
        return `<div class="container" style="padding-top: 24px">
                ${component(Counter, null, "123458")}
            </div>`;
    }
}
