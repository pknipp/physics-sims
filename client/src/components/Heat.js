import React from "react";
class Heat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            time: 0,
            n: 100,
        }
    }

    componentDidMount() {this.makeDist(this.state.n)}

    tick = _ => {
        let nextT = this.state.time + this.state.dt/1000;
        this.setState({time: nextT}, () => this.nextTs())
    }

    makeDist = _ => {
        let Ts = [];
        for (let i = 0; i < this.state.n; i++) {
            Ts.push(Math.random());
        }
        this.setState({ Ts });
    }


export default Heat;
