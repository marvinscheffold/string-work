# StringWork  

StringWork is a react-like library for building user interfaces.<br>

* It´s core is based on JavaScript template literals
* It is built with TypeScript 

# Installation

Right now StringWork is only available via this repository. 

To view demo project execute following in the root directory:

```shell
npm install
npm start
```

# Examples

```javascript

class Student extends Component {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (`
            <div>${this.props.name} is ${this.props.age} years old</div>
        `);
    }
}

new StringWorkDOM().render(
    component(Student, {name: "Mark", age: 24}),
    document.getElementById("container")
);

``` 
This example will render "Mark is 24 years old" into a container on the page.

You´ll  notice that StringWork uses an HTML-like Syntax. 
JavaScript template literals make that possible. Editors like WebStorm will highlight 
the code just like in an HTML-Document.

# Issues 

* After a render string-work loses focus on the activeElement.
* So far there is no call to the method `componentWillUnmount()` 
  before unmounting a component.
* The library must be attached to the window. Otherwise component-html-elements 
are not able to access their instances in the virtual dom. 
  


  


  

  

