import React from "react";
import ReactDOM from "react-dom";

class Greetings extends React.Component<{ name: string }, {}> {
    render() {
        return <h1>Hello {this.props.name}!</h1>;
    }
}

class Greetings2 extends React.Component<{ app: App }, { version: number }> {
    constructor(props: Readonly<{ app: App }>) {
        super(props)
        this.state = { version: 0 }
    }
    componentDidMount() {
        this.app.propertyChanged.push(t => this.setState({ version: this.state.version + 1 }))
    }
    get app() { return this.props.app; }
    render() {
        return <p>Hello {this.app.name}!</p>;
    }
}

class App implements INotifyPropertyChanged {
    async onPropertyChanged(name: string) {
        for (const handler of this.propertyChanged) {
            await handler(name)
        }
    }
    propertyChanged: Array<(name: string) => any> = []
    @configurable(true)
    foo() {

    }
    @onChanged()
    name: string;
    onChanged: () => void
}

export async function main() {
    const app = new App();
    app.name = "asdasda";
    ReactDOM.render(<Greetings2 app={app} />, document.querySelector("#root"));
    while (true) {
        await sleep(1000);
        app.name += ".";
        app.onChanged && app.onChanged()
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function onChanged() {
    return function (target: INotifyPropertyChanged, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get: new Function(`return this._${propertyKey}`) as () => any,
            set: new Function("value", `if (this._${propertyKey} == value) return
this._${propertyKey} = value
this.${propertyKey}Done = this.onPropertyChanged("${propertyKey}")
`) as (v: any) => any,
        })

    };
}

function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}


export interface INotifyPropertyChanged {
    onPropertyChanged(name: string)
}

export class Value<T> {
    onChanged() {

    }
    set(value: T) {

    }
    get(): T {

    }
}