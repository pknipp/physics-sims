import React, { useState, useEffect } from 'react';
import depthFirstSearch from './depthFirstSearch';
import breadthFirstSearch from './breadthFirstSearch';
import dijkstra, { getNodesInShortestPath } from './dijkstra';
import Node from './Node/Node';

import './PathfindingViz.css';

export default function PathfindingViz() {
  let [grid, setGrid] = useState([]);
  const [SPEED, SET_SPEED] = useState(20);
  let mousePressed = false;
  const GRID_HEIGHT = Math.floor(window.innerHeight / 35);
  const GRID_WIDTH = Math.floor(window.innerWidth / 27);

  // const START_NODE_ROW = 8;
  // const START_NODE_COL = 12;
  // const END_NODE_ROW = 22;
  // const END_NODE_COL = 37;
  const START_NODE_ROW = Math.floor(GRID_HEIGHT / 3);
  const START_NODE_COL = Math.floor(GRID_WIDTH / 4);
  const END_NODE_ROW = Math.floor(GRID_HEIGHT / 1.5);
  const END_NODE_COL = Math.floor(GRID_WIDTH / 1.3);


  useEffect(() => {
    setGrid(getBlankGrid(
      START_NODE_ROW,
      START_NODE_COL,
      END_NODE_ROW,
      END_NODE_COL,
      GRID_WIDTH,
      GRID_HEIGHT));
  }, [])

  const handleMouseDown = (row, col) => {
    const targetNode = grid[row][col];
    if (row === START_NODE_ROW && col === START_NODE_COL
      || row === END_NODE_ROW && col === END_NODE_COL) {
      return;
    }
    mousePressed = true;
    targetNode.isWall = !targetNode.isWall;
    const targetDomNode = document.getElementById(`loc-${row}-${col}`);
    targetNode.isWall ? targetDomNode.classList.add('node-is-wall') : targetDomNode.classList.remove('node-is-wall');
  }
  const handleMouseEnter = (row, col) => {
    const targetNode = grid[row][col];
    if (!mousePressed
      || row === START_NODE_ROW && col === START_NODE_COL
      || row === END_NODE_ROW && col === END_NODE_COL
      || targetNode.isWall) return;
    targetNode.isWall = !targetNode.isWall;
    const targetDomNode = document.getElementById(`loc-${row}-${col}`);
    targetNode.isWall ? targetDomNode.classList.add('node-is-wall') : targetDomNode.classList.remove('node-is-wall');
  }
  const handleMouseUp = () => {
    mousePressed = false;
  }
  const depthFirstSearchAnimate = (pathOfNodes) => {
    for (let i = 0; i < pathOfNodes.length; i++) {
      const interval = i * SPEED;
      setTimeout(() => {
        const currentPathNode = pathOfNodes[i];
        const currentDomNode = document.getElementById(`loc-${currentPathNode.row}-${currentPathNode.col}`);
        currentDomNode.classList.add('node-visited');
      }, interval)
    }
  }

  const depthFirstSearchVisualize = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const pathOfNodes = depthFirstSearch(grid, startNode, endNode);
    depthFirstSearchAnimate(pathOfNodes)
  }

  const breadthFirstSearchAnimate = (pathOfNodes) => {
    for (let i = 0; i < pathOfNodes.length; i++) {
      const interval = i * SPEED;
      setTimeout(() => {
        const currentPathNode = pathOfNodes[i];
        const currentDomNode = document.getElementById(`loc-${currentPathNode.row}-${currentPathNode.col}`)
        currentDomNode.classList.add('node-visited');
      }, interval)
    }
  }

  const breadthFirstSearchVisualize = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const pathOfNodes = breadthFirstSearch(grid, startNode, endNode);
    breadthFirstSearchAnimate(pathOfNodes)
  }


  const dijkstraAnimate = (pathOfNodes, shortestPath) => {
    for (let i = 0; i < pathOfNodes.length; i++) {
      const interval = i * SPEED;
      setTimeout(() => {
        const currentPathNode = pathOfNodes[i];
        const currentDomNode = document.getElementById(`loc-${currentPathNode.row}-${currentPathNode.col}`)
        currentDomNode.classList.add('node-visited');
        if (i === pathOfNodes.length - 1) {
          for (let j = 0; j < shortestPath.length; j++) {
            const newInterval = j * SPEED;
            setTimeout(() => {
              const currentShortNode = shortestPath[j];
              const currentShortDomNode = document.getElementById(`loc-${currentShortNode.row}-${currentShortNode.col}`);
              currentShortDomNode.classList.add('node-short-visited');
            }, newInterval);
          }
        }
      }, interval)
    }
  }

  const dijkstraVisualize = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const visitiedNodesInOrder = dijkstra(grid, startNode, endNode);
    const shortestPath = getNodesInShortestPath(endNode)
    dijkstraAnimate(visitiedNodesInOrder, shortestPath)
  }

  const resetGrid = () => {
    grid.forEach(row => row.forEach(node => {
      const currentDomNode = document.getElementById(`loc-${node.row}-${node.col}`)
      currentDomNode.classList.remove('node-visited', 'node-is-wall', 'node-short-visited')
    }))
    setGrid([])
    setGrid(getBlankGrid(START_NODE_ROW, START_NODE_COL, END_NODE_ROW, END_NODE_COL, GRID_WIDTH, GRID_HEIGHT));
    // updateDomGrid(grid, handleMouseDown, handleMouseEnter, handleMouseUp)
  }

  const animateAlgo = () => {
    const algos = [depthFirstSearchVisualize, breadthFirstSearchVisualize, dijkstraVisualize]
    const algoIdxString = document.getElementById('pathfinding-options').options.selectedIndex;
    const algoIdx = Number(algoIdxString)
    algos[algoIdx]();
  }

  return (
    <div id='grid-container'>
      <div id='grid-controls'>
        <select label='Choose an Algo' name="pathfinding-options" id="pathfinding-options">
          <option label='Depth First Search' value='0'></option>
          <option label='Breadth First Search' value='1'></option>
          <option label='Dijkstra' value='2'></option>
        </select>
        <button onClick={animateAlgo}>Search!</button>
        <button onClick={resetGrid}>Reset Grid</button>

      </div>
      {getInitialDomGrid(grid, handleMouseDown, handleMouseEnter, handleMouseUp)}
    </div>
  );
}


function getBlankGrid(startRow, startCol, endRow, endCol, gridWidth, gridHeight) {
  const grid = [];
  for (let row = 0; row < gridHeight; row++) {
    const currentRow = [];
    for (let col = 0; col < gridWidth; col++) {
      const currentNode = {
        col,
        row,
        isStart: row === startRow && col === startCol,
        isFinish: row === endRow && col === endCol,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
      };
      currentRow.push(currentNode);
    }
    grid.push(currentRow);
  }
  return grid;
}

function getInitialDomGrid(grid, handleMouseDown, handleMouseEnter, handleMouseUp) {
  return (
    <div className='grid'>
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className='grid-row'>
            {row.map((node, nodeIdx) => {
              const { isStart, isFinish, isVisited, col, row } = node;
              return (
                <Node
                  isStart={isStart}
                  isFinish={isFinish}
                  key={col + '-' + row}
                  location={row + '-' + col}
                  test={'hello there'}
                  isVisited={isVisited}
                  row={row}
                  col={col}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                ></Node>
              );
            })}
          </div>
        )
      })}
    </div>
  )
}
