import Component, {ComponentClass, ComponentProps, ComponentState} from "./component";

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

    getNewComponentId(): string{
        return this.virtualDom.length.toString();
    }

    getComponentHTML(ComponentClass: ComponentClass, props: ComponentProps, key: string): string {
        if (!this.componentIsInVirtualDom(key)) {
            let component = new ComponentClass(props, key);
            this.virtualDom.push(component);

            let html = this.addDataAttributeToHTMLString(component.render(),"id", component.id);
            component.componentDidRender(html);
            component.componentDidMount();
            return html

        } else {
            let component = this.getComponentInstanceByKey(key);

            if (component.shouldComponentUpdate(undefined, props)) {
                let prevProps = component.getProps();
                let prevState = component.getState();
                component.setProps(props);

                let html = this.addDataAttributeToHTMLString(component.render(),"id", component.id);
                component.componentDidRender(html);
                component.componentDidUpdate(prevProps, prevState);
                return html

            } else {
                return component.html
            }
        }
    }

    private addDataAttributeToHTMLString(html: string, dataKey: string, value: string){
        let htmlStart = html.substring(0,html.indexOf(">"));
        let htmlEnd = html.substring(html.indexOf(">"),html.length);
        return htmlStart + ` data-${dataKey}="${value}"` + htmlEnd;
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

    updateComponent(component: Component, prevProps: ComponentProps, prevState: ComponentState,){
        let html = this.addDataAttributeToHTMLString(component.render(),"id", component.id);
        document.querySelectorAll(`[data-id="${component.id}"]`)[0].outerHTML = html;
        component.componentDidRender(html);
        component.componentDidUpdate(prevProps, prevState);
    }

}

export function component(ComponentClass: ComponentClass, props: ComponentProps, key: string): string{
    return window.framework.getComponentHTML(ComponentClass, props, key);
}

export function initiateStringWork(){
    if(window.framework === undefined){
        window.framework = new StringWork();
        return window.framework;
    }
    console.log("StringWork is already initiated");
    return null;
}
