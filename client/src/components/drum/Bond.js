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
        debugger
        let { x: xi, y: yi, x1: x1i, y1: y1i } = prevProps;
        debugger
        let { x, y, x1, y1 } = this.props;
        debugger
        if (!(xi === x && yi === y && x1i === x1 && y1i === y1) || this.state.angle === null) {
            const dx = x1 - x;
            const dy = y1 - y;
            let rAngle = this.trig(dx, dy);
            debugger
            if (prevProps && rAngle) {
                this.r = rAngle[0];
                let angle = rAngle[1];
                const dxi = x1i - xi;
                const dyi = y1i - yi;
                let trigi = this.trig(dxi, dyi);
                if (trigi) {
                    debugger
                    // let anglei = trigi[1];
                    // if (dx < 0 && dxi < 0 && dy * dyi < 0) {
                    angle += ((Math.round((trigi[1] - angle) / 2 / Math.PI) * 2 * Math.PI));
                    debugger
                    // }
                }
                debugger
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
        let {x, y, dt} = this.props;
        let angle = this.state.angle * 180 / Math.PI;
        let r = this.r;
        debugger;
        return (!angle) ? null : (
            <div className="line bond" style={{
                width:`${r}px`,
                left: `${x -  r / 2}px`,
                top: `${y}px`,
                transform: `rotate(${angle}deg) translateX(${r / 2}px)`,
                transitionDuration: `${dt / 1000}s`,
            }}/>
        )
    }
}
export default Bond;
