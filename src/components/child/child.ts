import Component from "../../component";
import "./child.css"

type Props = {
    callback: Function,
    student:{
        name: string,
        age: number
    }
}

export default class Child extends Component{
    constructor(props: Props, key: string) {
        super(props, key);
        this.state = {
            color:this.randomColor()
        }
    }
    render() {
        let student = this.props.student;
        return (`
            <div class="view" style="background-color: ${this.state.color}" onclick="${this.self}.changeColor(event)">
             ${student.name} is ${student.age} years old   
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
