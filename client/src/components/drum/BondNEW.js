import React from "react";

class Bond extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.angle = 0;
    }

    render () {
        let {x, y, z, x1, y1, width, size, dt} = this.props;
        if (x1 === null || y1 === null) return null;
        const dx = x1 - x;
        const dy = y1 - y;
        const r = Math.sqrt(dx * dx + dy * dy);
        let angle = Math.atan2(dy, dx);
        debugger;
        if (angle !== this.angle) {
        if (Math.cos(this.angle) < 0 && dx < 0) {
            if (Math.sin(this.angle) * dy < 0) {
                if (dy < 0) {
                    angle += 2 * Math.PI;
                } else {
                    angle -= 2 * Math.PI;
                }
            }
        }}
        this.angle = angle;
        angle *= 180 / Math.PI;
        return (
            <div className="line bond" style={{
                width:`${r}px`,
                left: `${x - r / 2}px`,
                top: `${y}px`,
                transform: `rotate(${angle}deg) translateX(${r / 2}px)`,
                transitionDuration: `${dt / 1000}s`,
            }}/>
        )
    }
}
export default Bond;
