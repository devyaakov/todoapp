import './style.scss';
let todos = [];
let optionFooterActive = 1;

function LoadData(){
    todos = [
        {"description": "Complete online JavaScript course", realized: false },
        {"description": "Job around the park 3x", realized: false },
        {"description": "10 minutes meditation", realized: false },
        {"description": "10 minutes meditation", realized: false },
        {"description": "Pick up groceries", realized: false },
        {"description": "Complete Todo App on Frontend Mentor", realized: false },
    ];
    Refresh();
}

function initialize(){

    let newTodoInput = document.getElementById("newTodoInput");
    newTodoInput.addEventListener('keydown', (e)=>{
        if(e.key == "Enter"){
            
            AddTodo(document.getElementById("newTodoInput").value);
        }
    });

    let themeMode = document.getElementById("themeMode");

    let itemsLeft = document.getElementById("footer-itemsLeft");
    let footerAll = document.getElementById("footer-all");
    let footerActive = document.getElementById("footer-active");
    let footerCompleted = document.getElementById("footer-completed");
    let footerClear = document.getElementById("footer-clear");

    themeMode.addEventListener("click", () => OnClick_ChangeTheme());

    itemsLeft.addEventListener('click', () => OnClick_ItemsLeft());
    footerAll.addEventListener('click', () => OnClick_FooterAll());
    footerActive.addEventListener('click', () => OnClick_FooterActive());
    footerCompleted.addEventListener('click', () => OnClick_FooterCompleted());
    footerClear.addEventListener('click', () => OnClick_FooterClear());

    LoadData();
}

function OnClick_ChangeTheme(){
    console.log("Change theme");
    document.body.classList.toggle("dark");
}

function OnClick_FooterAll(){
    let elems = document.querySelectorAll(".items-footer div");
    elems.forEach(elem =>{
        elem.classList.remove('actived');
    });
    document.getElementById("footer-all").className += " actived";
    ShowAll();
}

function OnClick_FooterActive(){
    let elems = document.querySelectorAll(".items-footer div");
    elems.forEach(elem =>{
        elem.classList.remove('actived');
    });
    document.getElementById("footer-active").className += " actived";

    ShowByActive();
}

function OnClick_FooterCompleted(){
    let elems = document.querySelectorAll(".items-footer div");
    elems.forEach(elem =>{
        elem.classList.remove('actived');
    });
    document.getElementById("footer-completed").className += " actived";
    ShowCompleted();
}

function OnClick_FooterClear(){
    ClearCompleted();
}

function Refresh(){    

    let divItems = document.getElementById("items");
    divItems.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {
        const element = todos[i];
        let row = CreateRow(i, element.description, element.realized);
        row.draggable = true;
        row.addEventListener('dragstart', setDragstart);
        row.addEventListener('dragover', setDraggedOver);
        row.addEventListener('drop', setDrop);

        if(optionFooterActive == 2 && element.realized == false){
            divItems.appendChild(row)
        }else if (optionFooterActive == 3 && element.realized == true){
            divItems.appendChild(row)
        }else if(optionFooterActive == 1){
            divItems.appendChild(row)
        }
        
    }
    RefreshItemLeft();
}

function CreateRow(id, text, realized){
    let divRow = document.createElement('div');
    divRow.id = "item"+id;

    let divTodoOption = document.createElement('div');
    let divText = document.createElement('div');
    let divDelete = document.createElement('div');

    divRow.className = "row";

    if(realized)
        divRow.className += " realized";
    
    divTodoOption.className ="todo-option";
    divTodoOption.addEventListener('click', ()=> RealizedTodo(id));
    divText.innerHTML=text;
    divDelete.className = "delete";
    divDelete.addEventListener('click', ()=> RemoveTodo(id));

    divRow.appendChild(divTodoOption);
    divRow.appendChild(divText);
    divRow.appendChild(divDelete);

    return divRow;
}

function RealizedTodo(id){
    todos[id].realized = true;
    // document.getElementById("item"+id).className += " realized";
    RefreshItemLeft();
    Refresh();
}

function RemoveTodo(id){
    
    todos = todos.filter((value, key) => key != id );

    document.getElementById("item"+id).remove();
   
    Refresh();
}

function AddTodo(newTodo){
    document.getElementById("newTodoInput").value = '';
    todos.push({ "description": newTodo, realized: false });
    Refresh();
}

function ShowAll(){
    optionFooterActive = 1; // All
    Refresh();
}

function ShowByActive(){
    optionFooterActive = 2; // Active
    Refresh();
}

function ShowCompleted(){
    optionFooterActive = 3; // Completed
    Refresh();
}

function ClearCompleted(){
    todos = todos.filter(ele => ele.realized != true);
    Refresh();
}

function RefreshItemLeft(){
    let divItemLeft = document.getElementById("footer-itemsLeft");
    let elems = todos.filter(ele => ele.realized == false);
    divItemLeft.innerHTML = elems.length;
}


function setDragstart(e){
    e.dataTransfer.setData('text/plain', e.target.id);
}

function setDraggedOver(e){
    e.preventDefault();
}

function setDrop(e){
    const id = e.dataTransfer.getData("text/plain");
    let idDestino = e.target.id;

    if (idDestino == "")
        idDestino = e.target.parentElement.id;

    let idIntOrigen = parseInt(id.replace("item",""));
    let idIntDestino = parseInt(idDestino.replace("item",""));
    let item = todos.find((value, index) => index == idIntOrigen);
    

    todos.splice(idIntOrigen, 1);
    todos.splice(idIntDestino, 0, item);
    Refresh();
}

window.onload = initialize;


