let width = 19;
let height = 19;
var colors = require('colors/safe');
const chalk = require('chalk');


const directionArr = [
  {d:'L',x:-1,y:0},
  {d:'R',x:1,y:0},
  {d:'U',x:0,y:-1},
  {d:'D',x:0,y:1}
];


function Map( w, h ){

  let width = w*2-1;
  let height = h*2-1;

  const BLOCK_SPACE = ' ';
  const BLOCK_WALL = 'W';

  const BLOCK_START = 'S';
  const BLOCK_END = 'E';
  //const BLOCK_ = ' ';

  this.BLOCK_SPACE = BLOCK_SPACE;
  this.BLOCK_WALL = BLOCK_WALL;
  this.BLOCK_START = BLOCK_START;
  this.BLOCK_END = BLOCK_END;

  let map = new Array(height);
  for ( let i = 0; i < map.length; i ++ ){
    map[i] = new Array(width);
    map[i].fill(BLOCK_WALL);
  }

  let tasks = [];
  let directionArr = [
    {d:'L',x:-1,y:0},
    {d:'R',x:1,y:0},
    {d:'U',x:0,y:-1},
    {d:'D',x:0,y:1}
  ]

  let valid = ( x, y )=>{
    if ( x >= 0 && x< width && y >=0 && y < height){
      if ( map[y][x] === BLOCK_WALL ){
        return true;
      }
    }
    return false;
  }

  let choose = ( num )=>{
    return Math.floor(Math.random()* num);
  }

  let dig = (x, y)=>{
    let dir = []
    for ( let i of directionArr ){
      if ( valid( x+i.x*2, y+i.y*2 ) ){
        dir.push({d:i.d,x:x+i.x*2,y:y+i.y*2});
      }
    }
    if ( dir.length > 0 ){
      let d = choose(dir.length);
      let direct = dir[d].d;
      for ( let i of directionArr ){
        if ( direct === i.d ){
          map[y+i.y][x+i.x] = BLOCK_SPACE;
          map[y+i.y*2][x+i.x*2] = BLOCK_SPACE;
        }
      }
      tasks.push({x:x,y:y});
      tasks.push( dir[d] );
    }
  };

  let mid = {x:(width-1)/2,y:(height-1)/2 }
  tasks.push({x:mid.x,y:mid.y});
  map[mid.x][mid.y]=BLOCK_SPACE;

  let start = { x: choose(w)*2,y:0 };
  let end = { x: choose(w)*2,y:height-1 };

  this.start = start;
  this.end = end;


  while ( tasks.length > 0 ){
    let task = tasks.pop();
    dig(task.x,task.y);
  }

  map[start.y][start.x] = BLOCK_START;
  map[end.y][end.x] = BLOCK_END;

  this.map = map;
  this.width = width;
  this.height = height;

  this.print = () =>{
    for ( let i = 0; i < map.length; i ++){
      for ( let j = 0; j < map[i].length; j++ ){
        if ( map[i][j] === BLOCK_WALL ){
          process.stdout.write(chalk.bgBlack(map[i][j]));
        }
        else if ( map[i][j] === BLOCK_SPACE ||
        map[i][j] === BLOCK_START ||
        map[i][j] === BLOCK_END ){
          process.stdout.write(colors.bgBlue(map[i][j]));
        }
        else {
          process.stdout.write(colors.bgGreen(map[i][j]));
        }

      }
      process.stdout.write('\n');

    }
  };
  this.cloneMap = () =>{
    let clone = [];
    for ( let i = 0; i < map.length; i ++){
      clone[i] = [];
      for ( let j = 0; j < map[i].length; j ++){
        clone[i][j] = map[i][j];
      }
    }
    return clone;
  };
  return this;
}




let time = new Date().getTime();

let mapObj = new Map( width, height );
let map = mapObj.cloneMap();
//mapObj.print();

let endTime = new Date().getTime();
console.log(endTime-time);


console.log('SPACE:'+mapObj.BLOCK_SPACE);


let runtasks = [];

let validrun = ( x, y )=>{
  if ( x >= 0 && x< mapObj.width && y >=0 && y < mapObj.height){
    if ( map[y][x] === mapObj.BLOCK_SPACE ||
     map[y][x] === mapObj.BLOCK_START ||
     map[y][x] === mapObj.BLOCK_END ){
      return true;
    }
  }
};

let startX = mapObj.start.x;
let startY = mapObj.start.y;
let endX = mapObj.end.x;
let endY = mapObj.end.y;

console.log(startX);
console.log(startY);


console.log(endX);
console.log(endY);

runtasks.push({x:startX,y:startY,cost:0,arr:[]});
let sol = null;
let run = (x,y,cost,arr)=>{
  map[y][x]=2;
  if ( x === endX && y === endY ){
    runtasks.length = 0;
    arr.push({x:x,y:y});
    sol = arr;
    return;
  }
  for ( let i of directionArr ){
    if ( validrun(x+i.x,y+i.y) ){
      let newarr = arr.slice(0);
      newarr.push({x:x,y:y});
      runtasks.push({x:x+i.x,y:y+i.y,cost:cost+1,arr:newarr});
    }
  }
};

while ( runtasks.length > 0 ){
  let runtask = runtasks.shift();
//  console.log(runtask.cost)
  run( runtask.x, runtask.y, runtask.cost, runtask.arr);
}

let solmap = mapObj.map;
if ( sol ){
  for ( let i = 0; i < sol.length; i ++ ){
    solmap[sol[i].y][sol[i].x] = 2;
  }
}


mapObj.print();
