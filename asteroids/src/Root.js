import React from 'react';
import Collection from './Collection';

let rocks = [];
let n_rocks = 5000;
for (let i = 0; i < n_rocks; i++) {
    let rock = {};
    rock.xi = Math.random() - 0.5;
    rock.yi = Math.random() - 0.5;
    rock.zi = Math.random();
    rock.vx = 0.01 * (Math.random() - 0.5)
    rock.vy = 0.005 * (Math.random() - 0.5);
    rock.vz = 0.02 * (1 + 0.2 * (Math.random() - 0.5));
    rock.R = Math.floor(255 * Math.random());
    rock.G = Math.floor(255 * Math.random());
    rock.B = Math.floor(255 * Math.random());
    rocks.push(rock)
}
const Root = () => {
  return <Collection rocks={rocks} />
}

export default Root;
