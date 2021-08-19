import Component from "../string-work/component";
import { component } from "../string-work/string-work-dom";
import Time from "./time/time";

export default class App extends Component {
    constructor(props: any, key: string) {
        super(props, key);
    }
    render(): string {
        return `<div class="container" style="padding-top: 24px">
                ${component(Time, null, "12345")}
            </div>`;
    }
}
