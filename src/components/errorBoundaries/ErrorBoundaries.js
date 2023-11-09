import { Component } from "react";
import ErrorMasseg from '../error/error'
class ErrorBoundaries extends Component {
    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    render() {
        if(this.state.error) {
            return <ErrorMasseg/>
        }
        return this.props.children;
    }
}

export default ErrorBoundaries;