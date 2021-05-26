const container = document.querySelector('.todo-list');
const inputValue = document.querySelector('.todo-input');
const add = document.querySelector('.todo-button');

if(window.localStorage.getItem("todos") == undefined){
     const todos = [];
     window.localStorage.setItem("todos", JSON.stringify(todos));
}

const todosEX = window.localStorage.getItem("todos");
const todos = JSON.parse(todosEX);


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
      input.classList.toggle('completed');
      
        for (let v = 0 ; v < todos.length ; v++){
          if(input.classList.contains('completed') && todos[v].class === "uncompleted"){
            todos[v].class = "completed";
            console.log(todos[0].class);
            window.localStorage.setItem('todos', JSON.stringify(todos));
          }else{
            todos[v].class = "uncompletd";
          }
        }
      
    });

    	const edit = document.createElement('button');
    	edit.classList.add('edit');
    	edit.innerHTML = "Edit";
    	edit.addEventListener('click', () => {
        this.edit(input, name);
        input.focus();
        window.addEventListener('keyup', (e) => {
          if(e.keyCode == 13){
            edit.click();
          }
        })
      });

    	const remove = document.createElement('button');
    	remove.classList.add('remove');
    	remove.innerHTML = "REMOVE";
    	remove.addEventListener('click', () => this.remove(itemBox, name));
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
            todos[indexof] = input.value,
            window.localStorage.setItem("todos", JSON.stringify(todos));
        }
    }
   
    remove(itemBox, name){
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }
}

add.addEventListener('click', check);
// window.addEventListener('keydown', (e) => {
  
// 	if(e.key == 13){
// 		check();
// 	}
// })

function check(e){
  e.preventDefault();
	if(inputValue.value != ""){
		new item(inputValue.value);
        data = {
          value: inputValue.value,
          class: "uncompleted"
        }
        todos.push(data);
        window.localStorage.setItem("todos", JSON.stringify(todos));
		inputValue.value = "";
	}
}


for (let v = 0 ; v < todos.length ; v++){
    new item(todos[v].value);
}