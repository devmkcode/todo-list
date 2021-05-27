const container = document.querySelector('.todo-list');
const inputValue = document.querySelector('.todo-input');
const add = document.querySelector('.todo-button');


if(window.localStorage.getItem("todos") == undefined){
     const todos = [];
     window.localStorage.setItem("todos", JSON.stringify(todos));
}

if(window.localStorage.getItem("statusLocal") == undefined){
    const statusLocal = [];
    window.localStorage.setItem("statusLocal", JSON.stringify(statusLocal));
}

const todosEX = window.localStorage.getItem("todos");
const todos = JSON.parse(todosEX);
const statusLocal = JSON.parse(window.localStorage.getItem("statusLocal"));
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
        if(statusLocal[index] === "completed"){
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
        if(statusLocal[index] === "uncompleted"){
            statusLocal[index] = 'completed';
            input.classList.add('completed');  
            window.localStorage.setItem("statusLocal", JSON.stringify(statusLocal));
        }else{
            statusLocal[index] = 'uncompleted';
            input.classList.remove('completed');  
            window.localStorage.setItem("statusLocal", JSON.stringify(statusLocal));
        }
    }

    remove(itemBox, name){
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        statusLocal.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        window.localStorage.setItem("statusLocal", JSON.stringify(statusLocal));
    }
}

add.addEventListener('click', check);

function check(e){
     e.preventDefault();
	if(inputValue.value != ""){
       
	    new item(inputValue.value);
        todos.push(inputValue.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        statusLocal.push('uncompleted');
        window.localStorage.setItem("statusLocal", JSON.stringify(statusLocal));
		inputValue.value = "";
	}
}


for (let v = 0 ; v < todos.length ; v++){
    new item(todos[v]);
}