import Component from "../../string-work/component";
import {component} from "../../string-work/virtual-dom";
import Button from "../button/button";

type State = {
    time: string
}

export default class Time extends Component{
    state: State;
    constructor(props: any, key: string) {
        super(props, key);

        this.state = {
            time: new Date().getMilliseconds().toString()
        }
    }

    handleButtonClick(){
        this.setState({time: new Date().getMilliseconds().toString()})
    }

    render(){
        return(
            `<div class="container">
                <h2>${this.state.time}</h2>
                ${component(Button,{callback:()=>this.handleButtonClick()}, "KEY2")}
            </div>`
        );
    }
}