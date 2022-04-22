import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addTodo = (text) => {
  return {type: ADD_TODO, text};
}

const deleteTodo = (id) => {
  return {type: DELETE_TODO, id};
};

const reducer = (state = [], action) => {
  console.log(state, action)
  switch(action.type) {
    case ADD_TODO:
      return [{text: action.text, id: Date.now()}, ...state];
    case DELETE_TODO:
      return [];
    default:
      return state;
  }
};

const store = createStore(reducer);

const dispatchAddToDo = (text) => {
  store.dispatch(addTodo(text));
};

const dispatchDeleteTodo = (e) => {
  // 버튼이 li내부에 있으니 parentNode 사용
  const id = e.target.parentNode.id;
  store.dispatch(deleteTodo(id));
};

// paint? 단순 렌더링에 대한 내용인지 확인 필요
// painting이 렌더링을 하며 새로 그리는 의미인듯 함
const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteTodo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    ul.appendChild(li);
    li.appendChild(btn);
  });
};

store.subscribe(paintToDos);


const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
}

form.addEventListener("submit", onSubmit);
