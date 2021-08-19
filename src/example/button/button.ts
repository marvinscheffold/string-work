import Component from "../../string-work/component";

type Props = {
    onClick: Function
}

export default class Button extends Component{
    constructor(props: Props, key: string) {
        super(props, key);
    }

    render(){
        return(`<button type="button" class="btn btn-primary" onclick="${this.self}.props.callback()">Update Time</button>`)
    }
}