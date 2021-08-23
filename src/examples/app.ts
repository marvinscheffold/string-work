import Component from "../string-work/component";
import { c } from "../string-work/string-work-dom2";
import TemperatureConverter from "./temperature-converter/temperature-converter";

type State = {
    clicked: boolean;
};

export default class App extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            clicked: false,
        };
    }
    render() {
        return `
            <div class="container" style="padding-top: 24px">    
               ${c(TemperatureConverter, {})}
            </div>`;
    }
}
