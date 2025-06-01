// Javascript


//create 16x16 grid of square divs
//selectors
const container = document.querySelector("div.container");
let test = document.querySelector(".square");

const newGridButton = document.querySelector("#new-grid");
const colorSelector = document.querySelector("#color");
let color = colorSelector.value;
const randomToggle = document.querySelector("#random");
let isRandom = randomToggle.checked;


//Functions
function randomColor(){
    let r = Math.floor(Math.random() * 255).toString(16);
    let g = Math.floor(Math.random() * 255).toString(16);
    let b = Math.floor(Math.random() * 255).toString(16);
    let hex = "#"+r+g+b;
    return hex;
}
function createGrid(num){
     for (let i = 0; i < num; i++){
        let row = document.createElement("div");
        row.classList.add("row");
        for (let i = 0; i < num; i++){
            let col = document.createElement("div");
            col.classList.add("square");
            row.appendChild(col); //add square
        }
        container.appendChild(row);
    }
}
function createGridwithMouseEnterEvent(num) {
    //vertical flex container to stack rows
    for (let i = 0; i < num; i++){
        let row = document.createElement("div");
        row.classList.add("row");
        for (let i = 0; i < num; i++){
            let col = document.createElement("div");
            col.classList.add("square");
            col.addEventListener("mouseenter", handleMouseEntersGrid) // mouse enter square listener
            row.appendChild(col); //add square
        }
        container.appendChild(row);
    }
}
function handleMouseEntersGrid(e) {

    let newColor = (isRandom ? randomColor() : color) 
    this.style["background-color"] = newColor; //if random not checked use color picker color
    let newOpacity = (newColor === "#ffffff" ? 0 :(+this.style["opacity"] + 0.1) )
    this.style["opacity"] = newOpacity // had to convert to number from string
}
function clearGrid(){
    let listOfNodes = document.querySelectorAll(".container > *");
  
    listOfNodes.forEach((node) => {
        container.removeChild(node);
    });
}
function isInputValid(input) {
    let num = Number(input);
    if ( Number.isInteger(num) && num >= 1 && num <= 128 ){
        return true;
    }
    return false;
}
//Event Listeners
newGridButton.addEventListener("click", (e) => {
    
    let squares = Number(prompt("How many squares in the grid?")) 
    //input validation
    if (!isInputValid(squares)) {
        alert("Please Enter a whole number between 1 and 128.");
        return;
    }
    // squares = prompt("How many squares in the grid?")
    clearGrid();
    createGrid(squares)
});
colorSelector.addEventListener("input", (e) => {
    color = e.target.value;
   
})
randomToggle.addEventListener("input", (e) => {
    isRandom = e.target.checked
  
})
function addColor(item){
    let newColor = (isRandom ? randomColor() : color) 
    item.style["background-color"] = newColor; //if random not checked use color picker color
    item.style["opacity"] = +item.style["opacity"] + 0.1 // had to convert to number from string
}
function eraseColor(item){ 
    item.style["opacity"] = 0
}
let isDrawing = false;
let mode = "draw";
function setUpClickAndDrag() {
    //need mousedown listener, mouseover, mouseup
    container.addEventListener("contextmenu", e => e.preventDefault()); //prevent rightclick menu in container
    container.addEventListener("dragstart", e => e.preventDefault()); //prevent draggable for smooth drawing

    container.addEventListener("mousedown", (e) => {
   
        if (!e.target.classList.contains("square")) return;
        isDrawing = true
        if (e.button === 0){
            //left click
            mode = "draw";
            addColor(e.target)
        } else if (e.button === 2) {
            //right click
            mode = "erase";
            eraseColor(e.target)
        }
    });
    container.addEventListener("mouseover", (e) => {

        if (!e.target.classList.contains("square")) return;
       
        if (isDrawing && mode === "draw") {
            addColor(e.target)
        } else if (isDrawing && mode === "erase"){
            eraseColor(e.target)
        }
    });

    container.addEventListener("mouseup", (e) =>{
        isDrawing = false
    });

}

// run code
createGrid(16);
setUpClickAndDrag();