# StringWork  

StringWork is a react-like library for building user interfaces.<br>

* It´s core is based on JavaScript template literals
* It is built with TypeScript

# Why?

I really like React and in order to understand it even better 
I started this project. I do not intend to create a widely used 
framework - at least for now. This is just for fun and to push my own limits.

# Installation

Right now StringWork is only available via this repository. 

To view demo project execute following in the root directory:

```shell
npm install
npm start
```

# Examples

### Class Components

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
    c(Student, { name: "Mark", age: 24 }), 
    document.getElementById("container")
);

``` 
This example will render "Mark is 24 years old" into a container on the page.

You´ll  notice that StringWork uses an HTML-like Syntax. 
JavaScript template literals make that possible. Editors like WebStorm will highlight 
the code just like in an HTML-Document.

### Functional Components

```javascript

function Teacher(props: Props) {
    return (`
        <div>${this.props.name} is teaching ${this.props.subject}</div>
    `);
}

new StringWorkDOM().render(
    Teacher({ name: "Mr. Anderson", subject: "Math" }),
    document.getElementById("container")
);

``` 

This second example will render "Mr. Anderson is is teaching Math" into a container on the page.
Here I used a functional string-work-component.

# Issues 

* So far there is no call to the method `componentWillUnmount()` 
  before unmounting a component.
* The library must be attached to the window. Otherwise class components 
are not able to access their instances in the virtual dom. 
  


  


  






  

