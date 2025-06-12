import { useState, useEffect } from "react";
import localforage from "localforage";
import { Todo, Filter } from "../types";
import { isTodos } from "../lib/isTodos";
import { LOCAL_STORAGE_KEY } from "../constants";

/**
 * Todo管理画面で使用する変数と関数を提供する
 *
 * @param initialFilter 初期フィルター（"all", "checked", "unchecked", "removed" のいずれか）
 * @return Todo管理画面で使用する変数と関数
 */
export const useTodos = (initialFilter?: Filter) => {
  // 入力中のテキスト
  const [text, setText] = useState("");
  // ToDoリスト
  const [todos, setTodos] = useState<Todo[]>([]);
  // フィルター
  const [filter, setFilter] = useState<Filter>(initialFilter || "all");

  // 設定されたフィルターの値で抽出されたToDoリストを作成
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      // all(全てのタスク)：未削除のタスクを全て表示
      case "all":
        return !todo.removed;
      // checked(完了したタスク)：チェック済、かつ未削除のタスクを全て表示
      case "checked":
        return todo.checked && !todo.removed;
      // unchecked(現在のタスク)：未チェック、かつ未削除のタスクを全て表示
      case "unchecked":
        return !todo.checked && !todo.removed;
      // removed(ごみ箱)：削除済のタスクを全て表示
      case "removed":
        return todo.removed;
      default:
        return todo;
    }
  });

  /**
   * Todo入力欄の変更時にStateを更新する
   * @param e 入力イベント
   */
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  /**
   * フィルターを変更時にStateを更新する
   * @param newFilter 新しいフィルター値
   */
  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  /**
   * 追加ボタン押下時、新しいTodoを一覧に追加する
   */
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

  /**
   * 登録済のToDoを編集する
   * @param id 更新対象のToDoID
   * @param key 更新するプロパティのキー
   * @param value 更新後の値
   */
  const handleTodoUpdate = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, [key]: value } : todo))
    );
  };

  /**
   *　ごみ箱を空にする
   */
  const handleEmptyTrash = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  /**
   * ローカルストレージから登録済のToDoを読み込む
   */
  useEffect(() => {
    localforage
      .getItem(LOCAL_STORAGE_KEY)
      .then((values) => isTodos(values) && setTodos(values));
  }, []);

  /**
   * 追加されたTodoをローカルストレージへ保存
   */
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
