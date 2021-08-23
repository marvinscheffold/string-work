import { addStringWorkCSSToDOM } from "./string-work-css";
import Component, {
    ComponentClass,
    ComponentProps,
    ComponentState,
} from "./component";
import { component } from "./constants";
import TAG = component.TAG;
import DATA_KEY = component.DATA_KEY;

declare global {
    interface Window {
        StringWorkDOM: StringWorkDOM;
    }
}

declare global {
    interface String {
        hashCode: Function;
    }
}

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

        String.prototype.hashCode = function () {
            let hash = 0,
                i,
                chr;
            if (this.length === 0) return hash;
            for (i = 0; i < this.length; i++) {
                chr = this.charCodeAt(i);
                hash = (hash << 5) - hash + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash.toString().trim();
        };
    }

    public render(html: string, element: HTMLElement) {
        element.innerHTML = html;
    }

    private getComponentHTMLShell(component: Component): string {
        return `<${TAG} ${DATA_KEY}="${component.key}"></${TAG}>`;
    }

    private saveComponentSnapshot(component: Component, snapshot: string) {
        for (let i in this.virtualDomComponents) {
            if (this.virtualDomComponents[i].component.key === component.key) {
                this.virtualDomComponents[i].snapshot = snapshot;
                break;
            }
        }
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
        const html = component.render();
        this.saveComponentSnapshot(component, html);
        document.querySelectorAll(
            `[${DATA_KEY}="${component.key}"]`
        )[0].innerHTML = html;
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
        props: ComponentProps
    ): string {
        let string = Class.toString() + JSON.stringify(props);
        return string.hashCode();
    }

    private addKeyToProps(props: ComponentProps, key: string): ComponentProps {
        return { key: key, ...props };
    }

    public component(Class: ComponentClass, props: ComponentProps): string {
        const key = this.inferComponentKey(Class, props);
        let component = this.getComponentInstance(key);

        // New component to be mounted
        if (component === null) {
            component = this.createComponentInstance(
                Class,
                this.addKeyToProps(props, key)
            );
            try {
                return this.getComponentHTMLShell(component);
            } finally {
                setTimeout(() => this.mountComponent(component), 0);
            }
            // Component has been mounted before
        } else {
            const prevProps = component.getProps();
            const prevState = component.getState();
            component.setProps(props);
            try {
                return this.getComponentHTMLShell(component);
            } finally {
                setTimeout(
                    () => this.updateComponent(component, prevProps, prevState),
                    0
                );
            }
        }
    }
}

export function c(Class: ComponentClass, props: ComponentProps = {}): string {
    return window.StringWorkDOM.component(Class, props);
}
