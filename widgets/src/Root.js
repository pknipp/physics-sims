import React from 'react';
import Collection from './Collection';

let rocks = [];
let n_rocks = 100;
for (let i = 0; i < n_rocks; i++) {
    let rock = {};
    rock.xi = Math.floor(900 * Math.random());
    rock.yi = Math.floor(500 * Math.random());
    rock.zi = Math.floor(100 * Math.random());
    rock.vx = 0;
    rock.vy = 0;
    rock.vz = 2;
    // rock.vx = Math.floor(20 * Math.random() - 10);
    // rock.vy = Math.floor(10 * Math.random() - 5);
    // rock.vz = Math.floor(5 * Math.random());
    rock.R = Math.floor(255 * Math.random());
    rock.G = Math.floor(255 * Math.random());
    rock.B = Math.floor(255 * Math.random());
    rocks.push(rock)
}
debugger;
const Root = () => {
  return <Collection rocks={rocks}/>
}

export default Root;
