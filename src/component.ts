// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import * as _ from "lodash";

export interface ComponentClass {
    new (props: any, key: string): Component;
}

export interface ComponentProps {
    [key: string]: any
}

export interface ComponentState {
    [key: string]: any
}

export default abstract class Component{
    public readonly id: string = uuidv4();
    public readonly key: string;

    public html: string;

    protected readonly self: string = `window.framework.getComponentInstanceById('${this.id}')`;
    protected state: ComponentState = {};
    protected props: ComponentProps = {};

    protected constructor(props: ComponentProps = {}, key: string) {
        this.props = props
        this.key = key;
    }

    /*
     * Getter
     */

    getId(): string{
        return this.id;
    }

    /*
     * Setter
     */

    protected setState(state: ComponentState){
        // Cannot call setState with empty state
        // Reset state.fields instead
        if(state === undefined){return}
        this.state = state;
        window.framework.updateComponent(this);
    }

    /*
     * Lifecicle methods
     */
    abstract render(): string;

    componentDidRender(html: string){
        this.html = html;
    }

    componentDidMount(){

    }

    // If state or props changed return true
    // Pass undefined to only compare one of both state or props
    shouldComponentUpdate(nextState: ComponentState = this.state, nextProps: ComponentProps = this.props): boolean{
        return (!_.isEqual(nextState, this.state) || !_.isEqual(nextProps, this.props))
    }

    componentDidUpdate(){

    }

    componentWillUnmount(){

    }

}