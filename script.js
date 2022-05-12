const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));


formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    taskAdder();
});

list.forEach(task=>{
    taskAdder(task);
  })
  
function taskAdder(task){
   let newTask = inputEl.value;
   if(task){
       newTask = task.name; 
   }

   const liEl = document.createElement("li");
   
   if(task && task.checked){
       liEl.classList.add("checked");      
}

   liEl.innerText = newTask;
   ulEl.appendChild(liEl);
   inputEl.value = "";
   const checkButtonEl = document.createElement("div");
   checkButtonEl.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
   liEl.appendChild(checkButtonEl);

   
   const deleteButtonEl = document.createElement("div");
   deleteButtonEl.innerHTML = `<i class="fa-solid fa-trash"></i>`;
   liEl.appendChild(deleteButtonEl);

   checkButtonEl.addEventListener("click", ()=>{
       liEl.classList.toggle("checked");
       updateLocalStorage();
   });
   deleteButtonEl.addEventListener("click", ()=>{
        liEl.remove();
        updateLocalStorage();
       });
   updateLocalStorage();
}

function updateLocalStorage(){
   const liEls = document.querySelectorAll("li");
   list = [];

   liEls.forEach(liEl=> {
       list.push({
           name: liEl.innerText,
           checked: liEl.classList.contains("checked")
       })
   })

   localStorage.setItem("list", JSON.stringify(list))

}