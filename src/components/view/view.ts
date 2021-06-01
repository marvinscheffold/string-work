import Component, {ComponentProps} from "../../component";
import "./view.css"



export default class View extends Component{
    constructor(props: ComponentProps, refId: string) {
        super(props, refId);
        this.state = {
            color:this.randomColor()
        }
    }
    render() {
        let student = this.props.student;
        return (`
            <div style="background-color: ${this.state.color}" class="view" onclick="${this.self}.changeColor(event)">
                ${student.name} ist ${student.age} years old
            </div>
        `);
    }

    changeColor(event: Event){
        this.setState({color:this.randomColor()});
        this.props.callback(this.props.student);
        event.stopPropagation();
    }

    randomColor(): string{
        let color = "#"+Math.floor(Math.random()*16777215).toString(16);
        if(color.length<7){
            color = color + "0";
        }
        return color;
    }

}
