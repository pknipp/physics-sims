import React from 'react';
import Collection from './Collection';

// let rocks = [];
let nx = 4;
let ny = 3;
let xs = [];
let ys = [];
let rs = [];
let vs = [];
let Fs = [];
for (let i = 0; i < nx; i++) xs.push(-0.5 + (i + 1)/(nx + 1));
for (let j = 0; j < ny; j++) ys.push(-0.5 + (j + 1)/(ny + 1));
for (let i = 0; i < nx; i++) {
  let col = [];
  for (let j = 0; j < ny; j++) {
    col.push([0,0,0]);
  }
  rs.push(col);
  vs.push(col);
  Fs.push(col)
}

debugger
const Root = () => {
  return <Collection nx={nx} ny={ny} xs={xs} ys={ys} rs={rs} vs={vs} Fs={Fs} />
}

export default Root;
