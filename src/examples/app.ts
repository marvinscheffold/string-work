import Component from "../string-work/component";
import { c } from "../string-work/string-work-dom";
import TemperatureConverter from "./temperature-converter/temperature-converter";
import Counter from "./counter/counter";
import TodoList from "./todo-list/todo-list";

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
               ${c(TemperatureConverter, { key: "123456" }, this)}
            </div>`;
    }
}
