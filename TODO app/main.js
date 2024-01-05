let form =document.getElementById("form")
let textinput= document.getElementById("textinput");
let error = document.getElementById("msg");
let date = document.getElementById("dateinput");
let discription = document.getElementById("textarea")
let add = document.getElementById("add");
let taskcointaner = document.getElementById("tasks")



let task=[];
//Here on submit we add eventlistner to perform submit action, and in submit bydefault but action happen immediately.
// so we have to hold the submit action till varification of form.
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formvalidation();
})

let formvalidation = () =>{
if(textinput.value==="")
{
    error.innerText="Task cannot empty";
}
else
{
    error.innerText = "";
    savetaskdata();
// after saving data we have to close the modal form so we have to attribute of cros in submit also to use bootstrad 
    add.setAttribute("data-bs-dismiss","modal")
    add.click();
    add.setAttribute("data-bs-dismiss", "");
    // (() => {
    //     add.setAttribute("data-bs-dismiss", "")
    // })
}
}

let savetaskdata = () =>{
    task.push(
        {
            Title: textinput.value,
            Date: date.value,
            Discription : discription.value
        }
    );
// after adding task in array, we have to save in local storeage.
    localStorage.setItem("Task", JSON.stringify(task));
    showtask();
}

let showtask= ()=>{
    taskcointaner.innerHTML="";
    task.map((task,idx) =>{
        return (taskcointaner.innerHTML+=`<div id="${idx}">
        <samp class="fw-bold">${task.Title}</samp>
        <span class="small text-secondary">${task.Date}</span>
        <p>${task.Discription}</p>
        <span id="option">
            <i class="bi bi-pencil-square" onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form"></i>
            <i class="bi bi-trash" onclick="deleteTask(this)" ></i>
        </span>
    </div>`)
    })
    resetform();
}
let resetform = () =>{
    textinput.value="";
    date.value="";
    discription.value="";
}

let deleteTask = (e) =>{
    e.parentElement.parentElement.remove();
    //we remove the task from uim but it is still present in task array we have to delete from array also.
    task.splice(e.parentElement.parentElement.id, 1);
    console.log(task)
    // now we have to update the local storage also.
    localStorage.setItem("Task", JSON.stringify(task));
}

let editTask= (e)=>{
    let selectedtask=e.parentElement.parentElement;
    console.log(selectedtask.children[0].innerText);
    textinput.value= selectedtask.children[0].innerText;
    date.value= selectedtask.children[1].innerText;
    discription.value= selectedtask.children[2].innerText;
    deleteTask(e);
}