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

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

export default abstract class Component<
    PropType extends ComponentProps = any,
    StateType extends ComponentState = any
> {
    public readonly key: string;

    protected readonly self: string;
    protected state: StateType;
    protected props: PropType;

    protected constructor(props: PropType) {
        this.props = props;
        this.key = props.key;
        this.self = `StringWorkDOM.getComponentInstance('${this.key}')`;
    }

    protected setState<Key extends keyof StateType>(
        nextStateOrPropOfState: Pick<StateType, Key> | StateType
    ): void {
        if (
            nextStateOrPropOfState === undefined ||
            nextStateOrPropOfState === null ||
            !(typeof nextStateOrPropOfState === "object")
        ) {
            throw Error(
                "setState(...): takes an object of state variables to update"
            );
        }

        const prevState = { ...this.state };
        const nextState = Object.assign(
            { ...this.state },
            nextStateOrPropOfState
        );

        const shouldComponentUpdate = this.shouldComponentUpdate(
            this.props,
            nextState
        );

        this.state = nextState;

        if (shouldComponentUpdate) {
            window.StringWorkDOM.updateComponent(this, this.props, prevState);
        }
    }

    public setProps(nextProps: PropType): void {
        if (nextProps === undefined) return;
        if (!(typeof nextProps === "object")) {
            throw Error(
                "component props must be of type object or === undefined"
            );
        }

        const shouldComponentUpdate = this.shouldComponentUpdate(
            nextProps,
            this.state
        );

        const prevProps = { ...this.props };
        this.props = { ...nextProps };

        if (shouldComponentUpdate) {
            window.StringWorkDOM.updateComponent(this, prevProps, this.state);
        }
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
     * Lifecycle methods
     */
    abstract render(): string;

    public componentDidMount(): void {}

    public componentDidUpdate(
        prevProps: PropType,
        prevState: StateType
    ): void {}

    public componentWillUnmount(): void {}
}
