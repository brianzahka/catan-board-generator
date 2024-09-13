let board = []

let terrains = [
    "GRAIN","GRAIN","GRAIN","GRAIN",
    "LUMBER","LUMBER","LUMBER","LUMBER",
    "WOOL","WOOL","WOOL","WOOL",
    "ORE","ORE","ORE",
    "BRICK","BRICK","BRICK",
    "DESERT"
];  

let numberTokens = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12]

/*  Layout:
 * 
 *      0   1   2
 *      
 *    3   4   5   6
 *    
 *  7   8   9  10  11
 *  
 *    12  13  14  15
 *    
 *      16  17  18
 */


let neighbors = [
    [1, 3, 4],              //0
    [0, 2, 4, 5],           //1
    [1, 5, 6],              //2
    [0, 4, 8, 7],           //3
    [0, 1, 5, 9, 8, 3],     //4
    [1, 2, 6, 10, 9, 4],    //5
    [2, 5, 10, 11],         //6
    [3, 8, 12],             //7
    [3, 4, 9, 13, 12, 7],   //8
    [4, 5, 10, 14, 13, 8],  //9
    [5, 6, 11, 15, 14, 9],  //10
    [6, 10, 15],            //11
    [7, 8, 13, 16],         //12
    [8, 9, 14, 17, 16, 12], //13
    [9, 10, 15, 18, 17, 13],//14
    [10, 11, 18, 14],       //15
    [12, 13, 17],           //16
    [16, 13, 14, 18],       //17
    [17, 14, 15]            //18
]

function RandomItem(array){
    let index = Math.floor(Math.random() * array.length)
    let result = array.at(index)
    array.splice(index, 1)
    return result
}

function GenerateBoard(){
    let _terrains = terrains.slice()
    let _numberTokens = numberTokens.slice()
    let board = []
    for (let i = 0; i < terrains.length; i++){
        let terrain = RandomItem(_terrains)
        let numberToken = terrain != "DESERT" ? RandomItem(_numberTokens) : 0
        board.push({terrain: terrain, numberToken: numberToken})
    }
    return board
}

function RerollNumbers(board){
    let _numberTokens = numberTokens.slice()
    for (let i = 0; i < board.length; i++){
        let tile = board.at(i)
        let numberToken = tile.terrain != "DESERT" ? RandomItem(_numberTokens) : 0
        tile.numberToken = numberToken
    }
    return board
}

const canvasHeight = 800
const canvasWidth = 800

let cx = canvasHeight / 2
let cy = canvasWidth / 2

const a = 2 * Math.PI / 6;
const tileRadius = canvasWidth / 11
const boardRadius = canvasWidth / 2
let tileOffset = Math.PI/180 * 90
let boardOffset = 0
let h_displace = tileRadius * Math.sin(Math.PI/180 * 60)
let v_displace = tileRadius * Math.cos(Math.PI/180 * 60)




/*
function GetPattern(ctx, name){
    switch (name){
        case "WOOL":
            return ctx.createPattern(document.getElementById("wool"), null)
        case "GRAIN":
            return ctx.createPattern(document.getElementById("grain"), null)
        case "ORE":
            return ctx.createPattern(document.getElementById("ore"), null)
        case "BRICK":
            return ctx.createPattern(document.getElementById("brick"), "repeat")
        case "DESERT":
            return ctx.createPattern(document.getElementById("desert"), "repeat")
        case "LUMBER":
            return ctx.createPattern(document.getElementById("lumber"), "repeat")
 
    }
}
*/

function GetTerrainColor(name){
    switch (name){
        case "WOOL":
            return "#a0b830"
        case "GRAIN":
            return "#ffeb3b"
        case "ORE":
            return "#4c464e"
        case "BRICK":
            return "#ac400b"
        case "DESERT":
            return "#c9af68"
        case "LUMBER":
            return "#113f14"
        case "OCEAN":
            return "#0cadf3"
 
    }
}

function DrawHexagon(x, y, r, offset, terrainColor) {
    var c = document.getElementById("catanBoard");
    var ctx = c.getContext("2d");
    var points = []
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
      ctx.lineTo(x + r * Math.cos(a * i + offset), y + r * Math.sin(a * i + offset));
      points.push({x: x + r * Math.cos(a * i + offset), y: y + r * Math.sin(a * i + offset)})
    }
    ctx.fillStyle = terrainColor
    ctx.fill()
    ctx.closePath();
    ctx.stroke();
    return points
}

function DrawNumberToken(x, y, r, number){
    var c = document.getElementById("catanBoard");
    var ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fillStyle = "white";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    
    ctx.fill();
    ctx.stroke();

    if (number == 6 || number == 8){
        ctx.fillStyle = "red";
        ctx.font = "bold 25px serif";
    }else{
        ctx.fillStyle = "black";
        ctx.font = "25px serif";
    }
    
    
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(number, x, y);
}



var centerCoordinateLayout = [{x:cx-h_displace*2, y: cy - v_displace*6},{x:cx, y: cy - v_displace*6},{x:cx+h_displace*2, y: cy - v_displace*6},
    {x:cx-h_displace*3, y: cy - v_displace*3},{x:cx-h_displace*1, y: cy - v_displace*3},{x:cx+h_displace*1, y: cy - v_displace*3},{x:cx+h_displace*3, y: cy - v_displace*3},
    {x: cx - h_displace*4,y: cy}, {x: cx - h_displace*2,y: cy},{x: cx,y: cy},{x: cx + h_displace*2,y: cy},{x: cx + h_displace*4,y: cy},
    {x: cx-h_displace*3, y: cy + v_displace*3}, {x: cx-h_displace*1, y: cy + v_displace*3}, {x: cx+h_displace*1, y: cy + v_displace*3},{x: cx+h_displace*3, y: cy + v_displace*3},
    {x:cx-h_displace*2, y: cy + v_displace*6},{x:cx, y: cy + v_displace*6},{x:cx+h_displace*2, y: cy + v_displace*6} 
]


let numberConstrained = true
function toggleNumberConstrained(){
    numberConstrained = !numberConstrained
}

let maxSameAdjacentTerrains = 2
function updateTerrainConstraint(){
    let numberInput = document.getElementById("terrainConstraint")
    let max = numberInput.getAttribute("max")
    let min = numberInput.getAttribute("min")
    let value = numberInput.value
    if (value > max){
        value = Number(max)
        numberInput.value = value
    } else if (value < min){
        value = Number(min)
        numberInput.value = value
    }
    maxSameAdjacentTerrains = Number(value)
}

function isNumberConstrainedBoard(board){
    for (let i = 0; i < board.length; i++){
        var tile = board.at(i)
        if (tile.numberToken == 6 || tile.numberToken == 8){
            var tileNeighbors = neighbors[i]
            for (let j = 0; j < tileNeighbors.length; j++){
                let neighborAddress = tileNeighbors[j]
                if (board.at(neighborAddress).numberToken == 6 || board.at(neighborAddress).numberToken == 8){
                    return false
                }
            }
        }     
    }
    return true
}

function isTerrainConstrainedBoard(board){
    for (let i = 0; i < board.length; i++){
        var tile = board.at(i)      
        var tileNeighbors = neighbors[i]
        let sameTerrainNeighbors = 0
        for (let j = 0; j < tileNeighbors.length; j++){
            let neighborAddress = tileNeighbors[j]
            if (board.at(neighborAddress).terrain == tile.terrain){
                sameTerrainNeighbors += 1;
                if (sameTerrainNeighbors > maxSameAdjacentTerrains){
                    return false
                }
            }
        }          
    }
    return true
}



function DrawBoard(){
    var c = document.getElementById("catanBoard");
    var ctx = c.getContext("2d");
    ctx.canvas.height =canvasHeight
    ctx.canvas.width = canvasWidth

    var board = GenerateBoard()
    
    while (!isTerrainConstrainedBoard(board)){
        board = GenerateBoard()
    }
    
    if (numberConstrained){
        while (!isNumberConstrainedBoard(board)){
            RerollNumbers(board)
        }
    }
    

    DrawHexagon(cx, cy, boardRadius, boardOffset, GetTerrainColor("OCEAN"))

    for (let i = 0; i < centerCoordinateLayout.length; i++){
        var coords = centerCoordinateLayout.at(i)
        var tileData = board.at(i)
        var terrainColor = GetTerrainColor(tileData.terrain)
        DrawHexagon(coords.x, coords.y, tileRadius, tileOffset, terrainColor)
        if (tileData.numberToken != 0){
            DrawNumberToken(coords.x, coords.y, tileRadius/3.5, tileData.numberToken)
        }     
    }
}

window.onload = function() { 
    DrawBoard() 

}


  

