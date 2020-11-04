import React from 'react';
import Collection from './Collection';

// let rocks = [];
let nx = 4;
let ny = 3;
let xs = new Array(nx).map((elem, i) => -0.5 + (i + 1)/(nx + 1));
let ys = new Array(ny).map((elem, j) => -0.5 + (j + 1)/(ny + 1));
let zs = new Array(nx).map(elem => new Array(ny));

// let n_rocks = nx * ny;
// for (let i = 0; i < n_rocks; i++) {
//     let rock = {};
//     rock.xi = Math.random() - 0.5;
//     rock.yi = Math.random() - 0.5;
//     rock.zi = Math.random();
//     rock.vx = 0.01 * (Math.random() - 0.5)
//     rock.vy = 0.005 * (Math.random() - 0.5);
//     rock.vz = 0.02 * (1 + 0.2 * (Math.random() - 0.5));
//     // rock.R = Math.floor(255 * Math.random());
//     // rock.G = Math.floor(255 * Math.random());
//     // rock.B = Math.floor(255 * Math.random());
//     rocks.push(rock)
// }
const Root = () => {
  return <Collection nx={nx} ny={ny} xs={xs} ys={ys} zs={zs} />
}

export default Root;
