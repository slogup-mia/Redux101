import {createStore} from 'redux';

const form = document.querySelector("form")
const input = document.querySelector("input")
const ul = document.querySelector("ul")

const ADD_TODO = 'ADD_TODO'
const DELETE_TODO ='DELETE_TODO'

// store를 수정할 수 있는 유일한 방법 : action을 보내기
// NEVER USE MUTATE STATE!!!! state를 변형하지 말라.
    // 그 대신 new state objects, 즉 새로운 오브젝트를 리턴
const reducer = (state = [], action)=>{
    // console.log(action)
    switch (action.type) {
        case ADD_TODO: return [
            // ...state : state array의 contents를 의미 : 한묶음의 array가 아니라 컨텐츠를 헤쳐놓는것
            ...state, {text: action.text, id: Date.now()}
                // {text: action.text, id: Date.now()} , ...state 최신todo를 앞or뒤로 넣는것을 조정할수있다.
            // state.push(action.text) 안됨. mutate 하지마라.
        ]   // 요약: [...기존컨텐츠들, {text:새컨텐츠}]
        case DELETE_TODO: return []
        default: return state
    }
}

const store = createStore(reducer);

store.subscribe(()=> console.log(store.getState()))

const paintToDos = () => {
    const toDos = store.getState()
    ul.innerHTML ='';
    toDos.forEach(toDo => {
        const li = document.createElement(('li'));
        li.id = toDo.id
        li.innerText = toDo.text
        ul.appendChild(li)
    })
}
store.subscribe(paintToDos)

const addTodo = text =>{
    store.dispatch({type: ADD_TODO, text})
}


const onSubmit = e =>{
    e.preventDefault();
    const todo = input.value;
    input.value = '';
    // store.dispatch({type: ADD_TODO, text:todo})
    addTodo(todo)
}

form.addEventListener('submit',onSubmit);