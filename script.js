// Javascript


//create 16x16 grid of square divs

//selectors
const container = document.querySelector("div.container");
let test = document.querySelector(".square")



createGrid(64);

//Functions
function randomColor(){
    let r = Math.floor(Math.random() * 255).toString(16);
    let g = Math.floor(Math.random() * 255).toString(16);
    let b = Math.floor(Math.random() * 255).toString(16);
    let hex = "#"+r+g+b;
    console.log(hex)
    return hex;
}

function createGrid(num) {
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
    //console.log(this.style);
    const square = this;
    this.style["background-color"] = randomColor();
    // console.log( this.style["opacity"] )
    this.style["opacity"] = +this.style["opacity"] + 0.1 // had to convert to number from string
}
function clearGrid(){
    let listOfNodes = document.querySelectorAll(".container > *");
    console.log(listOfNodes);
    listOfNodes.forEach((node) => {
        container.removeChild(node);
    });
}

//Event Listeners
container.addEventListener("click", (e) => {
    console.log(e.target.classList.value);
});

//best practice is to add mousemove when you need and remove when you dont need it
//add mousemove event to mouseenter event and remove on mouse leave

//event.target.classList is DOMTokenList = class of is in .value
// container.removeEventListener()

//not what im going for i think
// function handleMouseMove(e) {
//     console.log(e.target);
//     if (e.target.classList.value === "square"){
//         console.log("YEE")
//     }
// }
// //on mouse enter add mousemove listener 
// container.addEventListener("mouseenter", (e) => {
//     container.addEventListener("mousemove", handleMouseMove);
// });
// //on mouse leave remove mousemove listener
// container.addEventListener("mouseleave", (e) => {
//     container.removeEventListener("mousemove", handleMouseMove);
// })