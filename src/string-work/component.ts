import * as _ from "lodash";

export interface ComponentClass {
    new (props: ComponentProps): Component;
}

export interface ComponentProps {
    [key: string]: any;
}

export interface ComponentState {
    [key: string]: any;
}

export default abstract class Component<
    PropType extends ComponentProps = any,
    StateType = any
> {
    public readonly key: string;

    public html: string;

    protected readonly self: string;
    protected state: StateType;
    protected props: PropType;

    protected constructor(props: PropType) {
        this.props = props;
        this.key = props.key;
        this.self = `StringWorkDOM.getComponentInstance('${this.key}')`;
    }

    protected setState(nextState: StateType) {
        if (
            nextState === undefined ||
            nextState === null ||
            !(typeof nextState === "object")
        ) {
            throw Error(
                "setState(...): takes an object of state variables to update"
            );
        }

        const shouldUpdate = this.shouldComponentUpdate(this.props, nextState);

        const prevState = { ...this.state };
        this.state = Object.assign(this.state, nextState);

        if (shouldUpdate) {
            window.StringWorkDOM.updateComponent(this, this.props, prevState);
        }
    }

    public getState(): StateType {
        return this.state;
    }

    public setProps(props: PropType) {
        if (props === undefined) {
            return;
        }
        this.props = { ...props };
    }

    public getProps(): PropType {
        return this.props;
    }

    // If state or props changed return true
    // Pass undefined to only compare one of both state or props
    public shouldComponentUpdate(
        nextProps: PropType = this.props,
        nextState: StateType = this.state
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

    public componentDidUpdate(prevProps: PropType, prevState: StateType) {}

    public componentWillUnmount() {}
}
