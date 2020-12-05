import React from "react";

class Bond extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: null,
        };
        this.r = null;
    }

    componentDidUpdate(prevProps) {
        let { x: xi, y: yi, x1: x1i, y1: y1i } = prevProps;
        let { x, y, x1, y1 } = this.props;
        if (!(xi === x && yi === y && x1i === x1 && y1i === y1) || this.state.angle === null) {
            let rAngle = this.trig(x1 - x, y1 - y);
            if (prevProps && rAngle) {
                this.r = rAngle[0];
                let angle = rAngle[1];
                const dxi = x1i - xi;
                const dyi = y1i - yi;
                let trigi = this.trig(dxi, dyi);
                let anglei = this.state.angle || (trigi ? trigi[1] : null);
                if (anglei) angle += ((Math.round((anglei - angle)/2/Math.PI)*2*Math.PI));
                this.setState({ angle });
            }
        }
    }

    trig =(dx, dy) => {
        if (!dx || !dy) return null;
        const r = Math.sqrt(dx * dx + dy * dy);
        let angle = Math.atan2(dy, dx);
        return [r, angle];
    }

    render () {
        let {x, y, x1, y1, dt, speed} = this.props;
        if (x1 === null || y1 === null) return null;
        let angle = this.state.angle * 180 / Math.PI;
        let r = this.r;
        debugger
        return (!angle) ? null : (
            <div className="line bond" style={{
                width:`${r}px`,
                left: `${x -  r / 2}px`,
                top: `${y}px`,
                transform: `rotate(${angle}deg) translateX(${r / 2}px)`,
                transitionDuration: `${dt / 1000 / Math.max(0.1, speed)}s`,
            }}/>
        )
    }
}
export default Bond;
