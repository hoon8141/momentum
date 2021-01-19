const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const ToDos_LS = "toDos";

let toDos = [];
let removeElementIds = [];
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    removeElementIds.push(parseInt(li.id));
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
      });
    toDos = cleanToDos;
    if(toDos.length===0){
        removeElementIds=[];
    }
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(ToDos_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    let newId;
    if(removeElementIds.length === 0) {
        newId = Date.now();
    }else {
        newId = removeElementIds.shift();
    }
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);  
    saveToDos();
}

function handleSubmit(submit){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
    
}
function loadToDos(){
    const loadedToDos = localStorage.getItem(ToDos_LS);
    if(loadedToDos!==null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(todo){
            paintToDo(todo.text);
        });

    }
}


function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();