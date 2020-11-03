import React from 'react';
import Collection from './Collection';

let rocks = [];
let n_rocks = 10000;
// let zmax = 100;
// let xmax = 900;
// let ymax = 400;
for (let i = 0; i < n_rocks; i++) {
    let rock = {};
    // rock.xi = 0.5;
    // rock.yi = -0.5;
    // rock.zi = 0;
    rock.xi = Math.random() - 0.5;
    rock.yi = Math.random() - 0.5;
    rock.zi = Math.random();
    rock.vx = 0.01 * (Math.random() - 0.5)
    rock.vy = 0.005 * (Math.random() - 0.5);
    rock.vz = 0.02 * (1 + 0.2 * (Math.random() - 0.5));
    // rock.vx = Math.floor(20 * (Math.random() - 0.5));
    // rock.vy = Math.floor(10 * (Math.random() - 0.5));
    // rock.vz = Math.floor(5 * Math.random());
    rock.R = Math.floor(255 * Math.random());
    rock.G = Math.floor(255 * Math.random());
    rock.B = Math.floor(255 * Math.random());
    rocks.push(rock)
}
// debugger;
const Root = () => {
  return <Collection rocks={rocks} />
}

export default Root;
