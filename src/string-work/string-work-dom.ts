import Component, {
    ComponentClass,
    ComponentProps,
    ComponentState,
} from "./component";

declare global {
    interface Window {
        StringWorkDOM: StringWorkDOM;
    }
}

export default class StringWorkDOM {
    private elements: Component[] = [];
    constructor() {
        window.StringWorkDOM = this;
        let style = document.createElement("style");
        style.appendChild(
            document.createTextNode("string-work-component{display:contents;}")
        );
        document.getElementsByTagName("head")[0].appendChild(style);
    }

    render(html: string, element: HTMLElement) {
        element.innerHTML = html;
    }

    getComponentHTML(
        ComponentClass: ComponentClass,
        props: ComponentProps,
        key: string
    ): string {
        if (!this.componentIsInStringWorkDOM(key)) {
            let component = new ComponentClass(props, key);
            this.elements.push(component);

            let html = this.addDataAttributeToHTMLString(
                component.render(),
                "id",
                component.id
            );
            component.componentDidRender(html);
            component.componentDidMount();
            return html;
        } else {
            let component = this.getComponentInstanceByKey(key);

            if (component.shouldComponentUpdate(undefined, props)) {
                let prevProps = component.getProps();
                let prevState = component.getState();
                component.setProps(props);

                let html = this.addDataAttributeToHTMLString(
                    component.render(),
                    "id",
                    component.id
                );
                component.componentDidRender(html);
                component.componentDidUpdate(prevProps, prevState);
                return html;
            } else {
                return component.html;
            }
        }
    }

    private addDataAttributeToHTMLString(
        html: string,
        dataKey: string,
        value: string
    ) {
        return `<string-work-component data-${dataKey}="${value}">${html}</string-work-component>`;
    }

    private componentIsInStringWorkDOM(key: string): boolean {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].key === key) {
                return true;
            }
        }
        return false;
    }

    getComponentInstanceByKey(key: string): Component {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].key === key) {
                return this.elements[i];
            }
        }
    }

    getComponentInstanceById(id: string): Component {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].id === id) {
                return this.elements[i];
            }
        }
    }

    updateComponent(
        component: Component,
        prevProps: ComponentProps,
        prevState: ComponentState
    ) {
        let html = this.addDataAttributeToHTMLString(
            component.render(),
            "id",
            component.id
        );
        document.querySelectorAll(`[data-id="${component.id}"]`)[0].outerHTML =
            html;
        component.componentDidRender(html);
        component.componentDidUpdate(prevProps, prevState);
    }
}

export function component(
    ComponentClass: ComponentClass,
    props: ComponentProps,
    key: string
): string {
    return window.StringWorkDOM.getComponentHTML(ComponentClass, props, key);
}
