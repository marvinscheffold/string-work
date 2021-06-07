import Component, {ComponentProps} from "../../component";
import "./parent.css"

import {component} from "../../string-work"
import Child from "../child/child";

export default class Parent extends Component{
    constructor(props: ComponentProps, key: string) {
        super(props, key);

        this.state = {
            clickedStudentName: "",
            students: props.students
        }
    }
    render(){
        return (`
             <div class="jumbo">
                <span>You clicked on student: ${this.state.clickedStudentName}</span>
                <br><br>
                    ${this.state.students.map((student: any, index: number) =>
                        component(Child,{callback: this.callback.bind(this), student: student},"KEY"+index)
                    ).join("")}
               
            </div>
        `);
    }

    callback(student: any){
        this.setState({clickedStudentName:student.name});
    }
}
