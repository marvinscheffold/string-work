import { addStringWorkCSSToDOM } from "./string-work-css";
import Component, {
    ComponentClass,
    ComponentProps,
    ComponentState,
} from "./component";
import { createComponentHtmlShell, getHash } from "./string-work-helper";
import { updateComponentNodes } from "./string-work-diffing";

type VirtualDomComponent = {
    component: Component;
    snapshot: string;
};

export class StringWorkDOM {
    private readonly virtualDomComponents: VirtualDomComponent[];

    constructor() {
        this.virtualDomComponents = [];
        window.StringWorkDOM = this;
        addStringWorkCSSToDOM();
    }

    public render(html: string, element: HTMLElement) {
        element.innerHTML = html;
    }

    private createComponentInstance(
        Class: ComponentClass,
        props: ComponentProps
    ): Component {
        const component = new Class(props);
        this.virtualDomComponents.push({
            component: component,
            snapshot: "",
        });
        return component;
    }

    public getComponentInstance(key: string): Component | null {
        for (let i in this.virtualDomComponents) {
            if (this.virtualDomComponents[i].component.key === key) {
                return this.virtualDomComponents[i].component;
            }
        }
        return null;
    }

    private renderComponent(component: Component): void {
        const nextHtml = component.render();
        updateComponentNodes(component, nextHtml);
    }

    public updateComponent(
        component: Component,
        prevProps: ComponentProps,
        prevState: ComponentState
    ): void {
        this.renderComponent(component);
        component.componentDidUpdate(prevProps, prevState);
    }

    private mountComponent(component: Component): void {
        this.renderComponent(component);
        component.componentDidMount();
    }

    private inferComponentKey(
        Class: ComponentClass,
        props: ComponentProps,
        context: any
    ): string {
        // If user passed key we use it
        if (props.key) {
            return props.key;
        }
        if (context !== null && context.key !== null) {
            return getHash(Class.toString() + context.key);
        }
        return getHash(Class.toString());
    }

    public component(
        Class: ComponentClass,
        props: ComponentProps,
        context: any
    ): string {
        const key = this.inferComponentKey(Class, props, context);
        let component = this.getComponentInstance(key);

        // New component to be mounted
        if (component === null) {
            component = this.createComponentInstance(Class, {
                key: key,
                ...props,
            });
            try {
                return createComponentHtmlShell(component);
            } finally {
                setTimeout(() => this.mountComponent(component), 0);
            }
            // Component has been mounted before, we just need to update props
        } else {
            try {
                return createComponentHtmlShell(component);
            } finally {
                setTimeout(() => component.setProps(props), 0);
            }
        }
    }
}

export function c(
    Class: ComponentClass,
    props: ComponentProps = {},
    context: any = null
): string {
    return window.StringWorkDOM.component(Class, props, context);
}
