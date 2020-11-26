export default function breadthSearchFirst(grid, startNode, endNode) {
  console.log('BST start ===')
  const pathOfNodes = breadthSearchFirstHelp(startNode, grid)
  return pathOfNodes;

}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeOne, nodeTwo) => nodeOne.distance - nodeTwo.distance);
}

function breadthSearchFirstHelp(startNode, grid) {
  console.log('BST help...', grid)
  const array = []
  const queue = [startNode]
  // let i = 10
  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (currentNode.isWall) continue;
    currentNode.isVisited = true;
    console.log(currentNode)
    if (currentNode.isFinish) return array;
    if (!currentNode.isStart) {
      array.push(currentNode);
    }
    // grid[currentNode.row][currentNode.col].isVisited = true
    const neighbors = getNeighbors(currentNode, grid);
    neighbors.forEach(node => node.isVisited = true);
    // console.log(neighbors)
    queue.push(...neighbors)
    // i--;
  }

  return array;
}


function getNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0 && !grid[row - 1][col].isVisited) neighbors.push(grid[row - 1][col]); // "top"
  if (col < grid[0].length - 1 && !grid[row][col + 1].isVisited) neighbors.push(grid[row][col + 1]) // "right"
  if (row < grid.length - 1 && !grid[row + 1][col].isVisited) neighbors.push(grid[row + 1][col]); // "bottom"
  if (col > 0 && !grid[row][col - 1].isVisited) neighbors.push(grid[row][col - 1]) // "left"
  return neighbors;
}

function updateNeighbors(node, grid) {
  const neighbors = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
  }
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node in row) {
      nodes.push(node);
    }
  }
  return nodes;
}
