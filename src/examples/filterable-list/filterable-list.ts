import Component from "../../string-work/component";
import { c } from "../../string-work/string-work-dom";
import Button from "../button/button";

type State = {
    entries: number;
};

export default class FilterableList extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            entries: 10,
        };
    }
    selectList(number: number) {
        this.setState({ entries: number });
    }

    render(): string {
        let entries = "";
        for (let i = 0; i < this.state.entries; i++) {
            entries += `<li class="list-group-item">Item Number ${i + 1}</li>`;
        }

        return `
            ${c(Button, {
                key: "button10",
                text: "Show 10",
                callback: (number: number) => {
                    this.selectList(10);
                },
            })}
            ${c(Button, {
                key: "button15",
                text: "Show 15",
                callback: (number: number) => {
                    this.selectList(15);
                },
            })}
        <ul class="list-group">
            ${entries}
        </ul>
            
        `;
    }
}
