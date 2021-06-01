import Component, {ComponentClass, ComponentProps} from "./component";

declare global {
    interface Window {
        framework: StringWork
    }
}

export default class StringWork{
    private virtualDom: Component[] = []

    constructor(){

    }

    render(html: string, element: HTMLElement){
        element.innerHTML = html;
    }

    createComponent(Component: ComponentClass, props: ComponentProps, key: string): string {
        if (!this.componentIsInVirtualDom(key)) {
            let component = new Component(props, key);
            this.virtualDom.push(component);

            let html = component.render();
            component.componentDidRender(html);
            component.componentDidMount();

            return `<div id="${component.id}">${html}</div>`

        } else {

            let component = this.getComponentInstanceByKey(key);

            if (component.shouldComponentUpdate(undefined, props)) {

                let html = component.render();
                component.componentDidRender(html);
                component.componentDidUpdate();

                return `<div id="${component.id}">${html}</div>`

            } else {
                let html = component.html;
                return `<div id="${component.id}">${html}</div>`
            }
        }
    }

    private componentIsInVirtualDom(key: string): boolean{
        for(let i = 0; i<this.virtualDom.length; i++){
            if(this.virtualDom[i].key === key){
                return true;
            }
        }
        return false;
    }

    getComponentInstanceByKey(key: string): Component{
        for(let i = 0; i<this.virtualDom.length; i++){
            if(this.virtualDom[i].key === key){
                return this.virtualDom[i];
            }
        }
    }

    getComponentInstanceById(id: string): Component{
        for(let i = 0; i<this.virtualDom.length; i++){
            if(this.virtualDom[i].id === id){
                return this.virtualDom[i];
            }
        }
    }

    updateComponent(component: Component){
        let html = component.render();
        document.getElementById(component.id).innerHTML = html;
        component.componentDidRender(html);
        component.componentDidUpdate();
    }

}

export function component(Component: ComponentClass, props: ComponentProps, key: string): string{
    return window.framework.createComponent(Component, props, key);
}
