import {component} from "../../framework"
import Component, {ComponentProps} from "../../component";
import View from "../view/view";
import "./jumbo.css"

export default class Jumbo extends Component{
    constructor(props: ComponentProps, refId: string) {
        super(props, refId);

        this.state = {
            name: ""
        }
    }
    render(){
        return (`
             <div class="jumbo">
                <span>I am looking for Student: <b>${this.state.name}</b></span><br>
                
                ${this.props.students.map((student: any, index: number) =>
                    component(View,{callback:this.callback.bind(this), student:student},"REFID"+index)
                ).join("")}
            </div>
        `);
    }
    componentDidUpdate() {


    }

    callback(student: any){
        this.setState({name:student.name});
    }
}
