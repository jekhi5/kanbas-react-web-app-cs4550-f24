import React from 'react';
import { useSelector } from 'react-redux';
import CounterRedux from './CounterRedux';
import AddRedux from './AddRedux';
import TodoList from './todos/TodoList';

export default function ReduxExamples() {
  const { message } = useSelector((state: any) => state.helloReducer);
  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4> <hr />
      <CounterRedux />
      <AddRedux />
      <TodoList />
    </div>
  );
}