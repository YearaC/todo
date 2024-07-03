// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// 1. check 버튼을 누르면 true false
//2. true이면 끝난걸로 간주하고 밑줄 긋기
//3. false이면 안 끝난걸로 간주하고 그대로

// 진행 중 끝남 탭을 누르면 언더바가 이동한다
// 끝남 탭은, 끝남 아이템만, 진행중 탭은 진행중인 아이템만
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴

// 유저가 값을 입력한다
let taskInput = document.getElementById("task-input")
// + 버튼을 클릭하면
let addButton = document.getElementById("add-button")
let taskList = []
addButton.addEventListener("click", addTask)



// + 버튼을 클릭하면, 할일이 추가된다
function addTask() {
    let task = {
        id:  randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false,

    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = "";
    for (let i = 0; i < taskList.length; i++) {
        if(taskList[i].isComplete){
            resultHTML+=`<div class="task">
        <div class="task-done completd"> ${taskList[i].taskContent} </div>
        <div>
            <button onclick="toggleComplete('${taskList[i].id}')"><i class="rotate fa-solid fa-rotate-right "></i></button>
            <button onclick="deleteTask('${taskList[i].id}')"><i class="trash fa-solid fa-trash"></i></button>
        </div>

    </div>`;
        }else {
            resultHTML+=`<div class="task">
            <div class="task-done"> ${taskList[i].taskContent} </div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')"><i class="check fa-solid fa-check"></i></button>
                <button onclisk="deleteTask('${taskList[i].id}')"><i class="trash fa-solid fa-trash"></i></button>
            </div>
    
        </div>`;

        }
        
    }


    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
 
 for(let i= 0; i < taskList.length;i++){
    if(taskList[i].id === id){
        taskList[i].isComplete = !taskList[i].isComplete;
        break;
    }
 }
 render();

 console.log(taskList);
}

function deleteTask(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
    console.log(taskList);
}


function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
};



/*
<innerHTML 와 textConetent의 차이>

ex)
 <div id="test">
        <hi>Hi</hi>
</div>

console.log(document.getElementById("test").innerHTML); // <h1>Hi</h1>
console.log(document.getElementById("test").textContent); // Hi


 innerHTML
        document.getElementById("test").innerHTML = `<h1>Noona</h1>`;
        console.log(document.getElementById("test").innerHTML); // <h1>Noona</h1>
        console.log(document.getElementById("test").textContent); // Noona

        // Clear the content for the next example
        document.getElementById("test").innerHTML = "";

Using textContent
        document.getElementById("test").textContent = `<h1>Noona</h1>`;
        console.log(document.getElementById("test").innerHTML); //  <h1>Noona</h1>
        console.log(document.getElementById("test").textContent); // <h1>Noona</h1>

*/
