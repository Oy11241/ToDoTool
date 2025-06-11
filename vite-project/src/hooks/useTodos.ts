import { useState, useEffect } from "react";
import localforage from "localforage";
import { Todo, Filter } from "../types";
import { isTodos } from "../lib/isTodos";
import { LOCAL_STORAGE_KEY } from "../constants";

export const useTodos = (initialFilter?: Filter) => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(initialFilter || "all");

  // フィルタリングされたTodoを取得
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "all":
        return !todo.removed;
      case "checked":
        return todo.checked && !todo.removed;
      case "unchecked":
        return !todo.checked && !todo.removed;
      case "removed":
        return todo.removed;
      default:
        return todo;
    }
  });

  // 入力テキストの変更ハンドラ
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // フィルター変更ハンドラ
  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  // Todo追加ハンドラ
  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos((todos) => [newTodo, ...todos]);
    setText("");
  };

  // Todo更新ハンドラ
  const handleTodoUpdate = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, [key]: value };
        }
        return todo;
      });
    });
  };

  // ゴミ箱を空にするハンドラ
  const handleEmptyTrash = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  // LocalStorageからの読み込み
  useEffect(() => {
    localforage
      .getItem(LOCAL_STORAGE_KEY)
      .then((values) => isTodos(values) && setTodos(values));
  }, []);

  // LocalStorageへの保存
  useEffect(() => {
    localforage.setItem(LOCAL_STORAGE_KEY, todos);
  }, [todos]);

  return {
    text,
    todos,
    filter,
    filteredTodos,
    handleTextChange,
    handleFilterChange,
    handleSubmit,
    handleTodoUpdate,
    handleEmptyTrash,
  };
};
