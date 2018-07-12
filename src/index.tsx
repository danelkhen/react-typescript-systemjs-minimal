import React from "react"
import ReactDOM from "react-dom"

class Greetings extends React.Component<{ name: string }, {}> {
    render() {
        return <h1>Hello {this.props.name}!</h1>;
    }
}

export function main() {
    ReactDOM.render(<Greetings name='world' />, document.querySelector('#root'));

}
