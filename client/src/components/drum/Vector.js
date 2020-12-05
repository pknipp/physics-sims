import React from "react";
class Vector extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
             angle: null,
         };
         this.mag = null;
     }

    componentDidUpdate(prevProps) {
        let { x: xi, y: yi, vec: veci } = prevProps;
        let { x, y, vec } = this.props;
        if (!(xi === x && yi === y) || this.state.angle === null) {
            let rAngle = this.trig(vec[0], vec[1]);
            if (prevProps && rAngle) {
                this.mag = rAngle[0];
                let angle = rAngle[1];
                let trigi = this.trig(veci[0], veci[1]);
                let anglei = this.state.angle || (trigi ? trigi[1] : null);
                if (anglei) angle += ((Math.round((anglei - angle)/2/Math.PI)*2*Math.PI));
                this.setState({ angle });
            }
        }
    }

    trig =(dx, dy) => {
        if (!dx || !dy) return null;
        const mag = Math.sqrt(dx * dx + dy * dy);
        let angle = Math.atan2(dy, dx);
        return [mag, angle];
    }

    render () {
        let { type, x, y, fac, speed, dt } = this.props;
        let mag = fac * this.mag / 2;
        let angle = this.state.angle * 180 / Math.PI;
        return (
            <div className={`line ${type}`} style={{
                width:`${mag}px`,
                left: `${x - mag/2}px`,
                top: `${y}px`,
                transform: `rotate(${angle}deg) translateX(${mag/2}px)`,
                transitionDuration: `${dt / 1000 / Math.max(0.1, speed)}s`,
            }}/>
        )
    }
}
export default Vector;
