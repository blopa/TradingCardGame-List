import {createStore} from 'redux';

const initialState = {
  questions: [] // {id: 1, question: '', answer: ''}
};

const reducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD':
      newState.questions.push(action.payload.question);
      break;
    case 'UPDATE':
      newState.questions = action.payload.questions;
      break;
    case 'SORT':
      newState.questions = newState.questions.sort((a, b) => a.question.toUpperCase() > b.question.toUpperCase());
      break;
    case 'REMOVE_ALL':
      newState.questions = [];
      break;
    default:
      break;
  }

  return newState;
};

const store = createStore(reducer);
store.subscribe(() => {});

export default store;
