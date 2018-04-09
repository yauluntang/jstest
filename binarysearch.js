let arr = [0,5,9,14,20,26,30];


let start = 0;
let end = arr.length;

let searchValue = 14;
let slope;
let index;
let newvalue;

while ( start < end ){

  //let mid = Math.floor( end - start );
  if (( end - start - 1 ) !== 0 ){
    slope = ( arr[end-1] - arr[start] ) / ( end - start - 1);
    index = ( searchValue - arr[start] + slope * start ) / ( slope )
    if ( index > end - 1 ){
      index = end -1;
    }
    if ( index < start ){
      index = start;
    }
    newvalue = arr[index];
  }
  else {
    if ( arr[start] !== searchValue ){
      console.log(null);
      return null;
    }
    else {
      console.log(index, arr[start]);
      return arr[start];
    }
  }
  if ( arr[index] > searchValue ){
    end = index;
  }
  if ( arr[index] < searchValue ){
    start = index;
  }
  if ( arr[index] === searchValue){
    console.log(index, arr[index]);
    return arr[index];
  }

}
console.log(null);
return null;
