import * as _ from "lodash";
import { v4 as uuid } from "uuid";

export interface ComponentClass {
    new (props: any, key: string): Component;
}

export interface ComponentProps {
    [key: string]: any;
}

export interface ComponentState {
    [key: string]: any;
}

export default abstract class Component {
    public readonly id: string = uuid();
    public readonly key: string;

    public html: string;

    protected readonly self: string = `StringWorkDOM.getComponentInstanceById('${this.id}')`;
    protected state: ComponentState;
    protected props: ComponentProps;

    protected constructor(props: ComponentProps, key: string) {
        this.props = props;
        this.key = key;
    }

    protected setState(state: ComponentState) {
        if (state === undefined) {
            return;
        }
        let prevState = this.state;
        this.state = Object.assign(this.state, state);
        window.StringWorkDOM.updateComponent(this, this.props, prevState);
    }

    public getState(): ComponentState {
        return this.state;
    }

    public setProps(props: ComponentProps) {
        if (props === undefined) {
            return;
        }
        this.props = props;
    }

    public getProps(): ComponentProps {
        return this.props;
    }

    // If state or props changed return true
    // Pass undefined to only compare one of both state or props
    public shouldComponentUpdate(
        nextState: ComponentState = this.state,
        nextProps: ComponentProps = this.props
    ): boolean {
        function customizer(obj1Value: any, obj2Value: any) {
            if (_.isFunction(obj1Value) && _.isFunction(obj2Value)) {
                return true;
            }
        }
        return (
            !_.isEqualWith(nextState, this.state, customizer) ||
            !_.isEqualWith(nextProps, this.props, customizer)
        );
    }

    /*
     * Lifecicle methods
     */
    abstract render(): string;

    public componentDidRender(html: string) {
        this.html = html;
    }

    public componentDidMount() {}

    public componentDidUpdate(
        prevProps: ComponentProps,
        prevState: ComponentState
    ) {}

    public componentWillUnmount() {}
}
