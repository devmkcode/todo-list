const container = document.querySelector('.todo-list');
const inputValue = document.querySelector('.todo-input');
const add = document.querySelector('.todo-button');


if(window.localStorage.getItem("todos") == undefined){
     const todos = [];
     window.localStorage.setItem("todos", JSON.stringify(todos));
}

if(window.localStorage.getItem("statusClass") == undefined){
    const statusClass = [];
    window.localStorage.setItem("statusClass", JSON.stringify(statusClass));
}

const todosEX = window.localStorage.getItem("todos");
const todos = JSON.parse(todosEX);
const statusClass = JSON.parse(window.localStorage.getItem("statusClass"));
class item{
	constructor(name){
		this.createItem(name);
	}
    createItem(name){

    	const itemBox = document.createElement('div');
        itemBox.classList.add('item');

    	const input = document.createElement('input');
    	input.type = "text";
    	input.disabled = true;
    	input.value = name;
    	input.classList.add('item_input');

        const complete = document.createElement('button');
            complete.classList.add('complete');
            complete.innerHTML = "Done";
            complete.addEventListener('click', () => {
            this.complete(name, input);
        });

    	const edit = document.createElement('button');
    	edit.classList.add('edit');
    	edit.innerHTML = "EDIT";
    	edit.addEventListener('click', () => {
          this.edit(input, name);
          input.focus();
          window.addEventListener('keyup', (e) => {
          if(e.keyCode == 13){
          edit.click();
          }
          });
        });

    	const remove = document.createElement('button');
    	remove.classList.add('remove');
    	remove.innerHTML = "REMOVE";
    	remove.addEventListener('click', () => this.remove(itemBox, name));

        let index = todos.indexOf(name);
        if(statusClass[index] === "completed"){
            input.classList.add("completed");
        }else{
            input.classList.remove("completed");
        }

    	container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(edit);
        itemBox.appendChild(complete);
        itemBox.appendChild(remove);

    }

    edit(input, name){
        if(input.disabled == true){
           input.disabled = !input.disabled;
        }
    	else{
            input.disabled = !input.disabled;
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
            window.localStorage.setItem("todos", JSON.stringify(todos));
        }
    }

    complete(name, input){
        let index = todos.indexOf(name);
        if(statusClass[index] === "uncompleted"){
            statusClass[index] = 'completed';
            input.classList.add('completed');  
            window.localStorage.setItem("statusClass", JSON.stringify(statusClass));
        }else{
            statusClass[index] = 'uncompleted';
            input.classList.remove('completed');  
            window.localStorage.setItem("statusClass", JSON.stringify(statusClass));
        }
    }

    remove(itemBox, name){
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        statusClass.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        window.localStorage.setItem("statusClass", JSON.stringify(statusClass));
    }
}

add.addEventListener('click', check);

function check(e){
     e.preventDefault();
	if(inputValue.value != ""){
        let index = todos.indexOf(inputValue.value);
        if(todos[index] === inputValue.value){
            alert('You already have it on your list.');
            inputValue.value = "";
        }else{
	    new item(inputValue.value);
        todos.push(inputValue.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        statusClass.push('uncompleted');
        window.localStorage.setItem("statusClass", JSON.stringify(statusClass));
		inputValue.value = "";}
	}
}


for (let v = 0 ; v < todos.length ; v++){
    new item(todos[v]);
}