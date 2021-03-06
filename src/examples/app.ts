import Component from "../string-work/component";
import { c } from "../string-work/string-work-dom";

/** Example: Bi-directional data-flow **/
import TemperatureConverter from "./temperature-converter/temperature-converter";

/** Example: State management **/
import Counter from "./counter/counter";

/** Example: async await **/
import TodoList from "./todo-list/todo-list";

/** Example: https://reactjs.org/docs/thinking-in-react.html **/
import FilterableProductTable from "./filterable-product-table/filterable-product-table";

/** Example showing that string-work can handle many fast state updates **/
import StopWatch from "./stop-watch/stop-watch";

export default class App extends Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        return `
            <div class="container" style="padding-top: 24px">    
               ${c(StopWatch, { key: "stop-watch" }, this)}
            </div>`;
    }
}
