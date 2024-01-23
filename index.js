//sum(grade x unit)/total units

const grade = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2,
    "E": 1,
    "F": 0
}



const inputsWrapperElem = document.querySelector("#inputs-wrappers")

//[{grade: number, unit: number}]

function calculateGp (arr){
    const sumOfGradeTimesUnit = arr.reduce((prev, curr)=>prev + (curr.grade * curr.unit), 0)
    const totalUnits = arr.reduce((prev, curr)=>prev + curr.unit, 0)
    return (sumOfGradeTimesUnit/totalUnits).toFixed(2)
}

function getInfo(){

    let info = []

document.querySelectorAll("#inputs-wrapper").forEach(elem=>{
    const gradeInput = elem.children[1]
    const unitInput = elem.children[2]
    info.push({grade: parseFloat(grade[gradeInput?.value]), unit: parseFloat(unitInput?.value)})
})
return info
}


const calcBtn = document.querySelector("#Calc")
const resetBtn = document.querySelector("#Reset")

const totalGp = document.querySelector("#GP")
const totalCredits = document.querySelector("#Total-credits")

calcBtn.addEventListener("click", (e)=>{
    if(!validateInputs())return 
    const info = getInfo()
    const cgpa= calculateGp(info)
    const credits = info.reduce((prev, curr)=>prev+curr.grade,0)
    const gradePoint = info.reduce((prev, curr)=>prev + (curr.grade*curr.unit), 0)
    totalGp.value = cgpa
    totalCredits.value = credits
    openDialog(cgpa, credits, gradePoint)
})

resetBtn.addEventListener("click",e=>{
    document.querySelectorAll("#inputs-wrapper").forEach(elem=>{
        elem.children[0].value = ""
        elem.children[1].value = ""
        elem.children[2].value = ""
    })
})

//add course 
function addCourse(){
    const divElem = document.createElement("div")
    divElem.classList.add("inputs-wrapper")
    divElem.id = "inputs-wrapper"
    const cNameInputElem = document.createElement("input")
    cNameInputElem.attributes.type = "text"
    cNameInputElem.attributes.name = "course"
    cNameInputElem.id = "course"

    divElem.append(cNameInputElem)

    const gradeSelectElem = document.createElement("select")
    gradeSelectElem.id = "grade"
    const optionElem = document.createElement("option")
    optionElem.value = ""
    optionElem.textContent = "Select grade"
    gradeSelectElem.append(optionElem)
    for(let key of Object.keys(grade)){
        const optionElem = document.createElement("option")
        optionElem.value = key
        optionElem.textContent= key
        gradeSelectElem.append(optionElem)
    }

    divElem.append(gradeSelectElem)

    const unitSelectElem = document.createElement("select")
    unitSelectElem.id = "unit"
    for(let i = 0; i < 7; i++){
        const optionElem = document.createElement("option")
        if(i === 0){
            optionElem.textContent = "select unit"
        }else{

        optionElem.value = i.toString()
        optionElem.textContent= i.toString()
        }
        unitSelectElem.append(optionElem)
    }
    divElem.append(unitSelectElem)
    divElem.innerHTML += '<iconify-icon class="icn-rm" id="del-course" icon="dashicons:remove"></iconify-icon>'
    divElem.querySelector("#del-course")
    .addEventListener("click", (e)=>{
            divElem.remove()
        })
    inputsWrapperElem?.append(divElem)
}

function clearAll(){
    document.querySelectorAll("#inputs-wrapper").forEach(elem=>{
        elem.remove()
    })
}

function validateInputs(){
    const wrappers = document.querySelectorAll("#inputs-wrapper")
    for(let wrapper of wrappers){
        const inputs = wrapper.children
        console.log(inputs[0].value, inputs[1].value, inputs[2].value)
        if(!inputs[0].value || !inputs[1].value || !inputs[2].value){
            
            return false
        }
    }
    return true
}

const addCourseElem = document.querySelector("#Add")
const clearAllElem = document.querySelector("#Clear")

addCourseElem.addEventListener("click", (e)=>{
    e.preventDefault()
    addCourse()
})

clearAllElem.addEventListener("click", (e)=>{
    e.preventDefault()
    clearAll()
})

function openDialog(cgpa, credits, gradePoint){
    const dialogWrapper = document.querySelector("#dialog-wrapper")
    dialogWrapper.style.display = "block"
    const dialogGpElem = document.querySelector("#dialog-gp")
    const dialogCreditElem = document.querySelector("#dialog-credit")
    const dialogGradePointElem = document.querySelector("#dialog-grade-point")
    dialogGpElem.textContent = cgpa
    dialogCreditElem.textContent = credits
    dialogGradePointElem.textContent = gradePoint
}

function closeDialog(){
    const dialogWrapper = document.querySelector(".dialog-wrapper")
    dialogWrapper.style.display = "none"
}

document.querySelectorAll("#del-course").forEach((el, i)=>{
    el.addEventListener("click", (e)=>{
        el.parentElement.remove()
    })
})

document.querySelector("#dialog-wrapper").addEventListener("click",closeDialog)