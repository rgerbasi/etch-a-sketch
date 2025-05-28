// Javascript
console.log("test")

//create 16x16 grid of square divs
const container = document.querySelector("div.container")
//vertical flex container to stack rows
for (let i = 0; i < 16; i++){
    //row
    let row = document.createElement("div")
    row.classList.add("row")
    for (let i = 0; i < 16; i++){
        let col = document.createElement("div")
        col.classList.add("square")
        row.appendChild(col)
    }
    container.appendChild(row)
}

