import * as ActionTypes from './ActionTypes';

export const SetTodos = (todos) => ({
    type : ActionTypes.SET_TODOS,
    payload : todos
})

export const DeleteTodos = (todos) => ({
    type : ActionTypes.DELETE_TODO,
    payload : todos
})

export const UpdateTodos = (todos) => ({
    type : ActionTypes.UPDATE_TODO,
    payload : todos
})

export const AddTodos = (todos) => ({
    type : ActionTypes.ADD_TODO,
    payload : todos
})
