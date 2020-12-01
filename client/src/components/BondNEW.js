import React from "react";

class Bond extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0,
            calcAngle: false,
        }
    }
    handleAngle = (dx, dy) => {
        let angle = Math.atan2(dy, dx) * 180 / Math.PI;
        // angle += (Math.round((this.state.angle - angle)/360) * 360);
        this.setState({ angle, calcAngle: true });
    }
    resetAngleCalc = () => this.setState({ calcAngle: false });
    render () {
        let {x, y, z, x1, y1, width, size, dt} = this.props;
        if (x1 === null || y1 === null) return null;
        const dx = x1 - x;
        const dy = y1 - y;
        const r = Math.sqrt(dx * dx + dy * dy);
        if (!this.state.calcAngle) this.handleAngle(dx, dy);
        return (
            <div className="line bond" style={{
                width:`${r}px`,
                left: `${x - r / 2}px`,
                top: `${y}px`,
                transform: `rotate(${this.state.angle}deg) translateX(${r / 2}px)`,
                transitionDuration: `${dt / 1000}s`,
            }}/>
        )
    }
}
export default Bond;
