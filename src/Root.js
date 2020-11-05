import React from 'react';
import Collection from './Collection';

// let rocks = [];
let n = 81;
let nx = Math.ceil(Math.sqrt(n));
let ny = nx;
let a = 1/nx;
let width = a * 0.2;
let xs = [];
let ys = [];
let rs = [];
let vs = [];
let Fs = [];
for (let i = 0; i < nx; i++) xs.push(-0.5 + (i + 1)/(nx + 1));
for (let j = 0; j < ny; j++) ys.push(-0.5 + (j + 1)/(ny + 1));
for (let i = 0; i < nx; i++) {
  const colr = [];
  const colv = [];
  const colF = [];
  for (let j = 0; j < ny; j++) {
    colr.push([0,0,0]);
    colv.push([0,0,0]);
    colF.push([0,0,0]);
  }
  rs.push(colr);
  vs.push(colv);
  Fs.push(colF)
}

rs[Math.floor(nx/2)][Math.floor(ny/2)][0] = a * 0.5 //0.9;
rs[Math.floor(nx/2)][Math.floor(ny/2)][1] = a * 0.3 //0.7 //0.02;
rs[Math.floor(nx/2)][Math.floor(ny/2)][2] = 2

debugger
const Root = () => {
  return <Collection nx={nx} ny={ny} xs={xs} ys={ys} rs={rs} vs={vs} Fs={Fs} width={width}/>
}

export default Root;
