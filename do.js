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
let tabs = document.querySelectorAll(".task-tabs div")
//querySelectorAll= 조건에 만족하는 모든걸 가져오기
let taskList = [];
let mode= 'all';
let filterList = [];

let horizontalBar = document.getElementById("under-line");//가로 under bar 움직이기
let horizontalMenus = document.querySelectorAll('#all, #ongoing, #done');

addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus",function(){taskInput.value= "";})

taskInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();
    } //새 할일 입력을 엔터로 입력
});



function horizontalIndicator(e) {
    horizontalBar.style.left = e.offsetLeft + "px";
    horizontalBar.style.width = e.offsetWidth + "px";
    horizontalBar.style.top = e.offsetTop + e.offsetHeight + "px";
  }

horizontalMenus.forEach((menu) =>
    menu.addEventListener("click", (e) =>
      horizontalIndicator(e.currentTarget)
    )
  );
  



for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
        filter(event);
    });
}



// + 버튼을 클릭하면, 할일이 추가된다
function addTask() {
    let taskContent = taskInput.value.trim();//trim() 메서드는 문자열 양 끝의 공백을 제거합니다. 

    if (taskContent === "") {
        alert("할 일을 입력하세요."); // 입력값이 비어 있을 경우 알림을 통해 사용자에게 알림
        return;
    }


    let task = {
        id: randomIDGenerate(),
        taskContent: taskContent, //객체 리터럴 문법-taskContent 속성은 사용자가 입력한 할 일 내용(taskContent 변수의 값)을 저장합니다.
        isComplete: false,

    };
   
    taskList.push(task);
    taskInput.value = "";
    render();
}

function render() {
    //1. 내가 선택한 탭에 따라서
    
    let list = []
    if (mode ==="all"){
        list= taskList;
        //all taskList
    } else if(mode === "ongoing" || mode === "done"){
        list = filterList;
        //ongoing, done filterList
    }
    
    //2 리스트를 달리 보여준다

    //all taskList
    //ongoing, done filter List
    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {

       

        if (list[i].isComplete) {
            resultHTML += `<div class="task">
                <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')"><i class="rotate fa-solid fa-rotate-right"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="trash fa-solid fa-trash"></i></button>
                </div>
            </div>`;
        }
        
        
        else {
            resultHTML += `<div class="task">
                <div>${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')"><i class="check fa-solid fa-check"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="trash fa-solid fa-trash"></i></button>
                </div>
            </div>`;
        }
    }


    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filterTasks();
    render();
}


function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1)
            break;
        }
    }
    filterTasks();
    render();

}

function filterTasks() {
    filterList = [];
    if (mode === "all") {
        filterList = taskList;
    } else if (mode === "ongoing") {
        for (let i = 0; i < taskList.length; i++) {
            if (!taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
    } else if (mode === "done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
    }
}



//내가 누구를 클릭했는지에 대한 정보를 가지고 있음
function filter(event) {
    mode = event.target.id;
    filterList = [];
    
    if (mode === "all") {
        filterList = taskList;
    } else if (mode === "ongoing") {
        for (let i = 0; i < taskList.length; i++) {
            if (!taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
    } else if (mode === "done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
    }
    
    render();
}




function randomIDGenerate() {
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
