import { useState, useEffect, useMemo } from "react";
import localforage from "localforage";
import { Todo, Filter, Priority, Sort } from "../types";
import { isTodos } from "../lib/isTodos";
import { LOCAL_STORAGE_KEY } from "../constants";
import { registerLocale } from "react-datepicker";
import { ja } from "date-fns/locale/ja";

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
  // 期限日
  const [dueDate, setDueDate] = useState<Date>(new Date());
  // 優先度
  const [priority, setPriority] = useState<Priority>("medium");
  // カレンダー日付
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // ソート
  const [sort, setSort] = useState<Sort>("priorityAsc");

  // DataPickerを日本語表記にするために使用
  registerLocale("ja", ja);

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

  // 設定されたソートの値で並び替えされたToDoリストを作成
  const sortedTodos = useMemo(() => {
    const sorted = [...filteredTodos].sort((a: Todo, b: Todo) => {
      let result = 0;

      if (sort.startsWith("priority")) {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        result = priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sort.startsWith("dueDate")) {
        const dateA = new Date(
          a.dueDate.getFullYear(),
          a.dueDate.getMonth(),
          a.dueDate.getDate()
        ).getTime();
        const dateB = new Date(
          b.dueDate.getFullYear(),
          b.dueDate.getMonth(),
          b.dueDate.getDate()
        ).getTime();
        result = dateA - dateB;
      }

      return sort.endsWith("asc") ? result : -result;
    });

    return sorted;
  }, [filteredTodos, sort]);

  /**
   * Todo入力欄の変更時にStateを更新する
   * @param e 入力イベント
   */
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  /**
   * フィルターの変更時にStateを更新する
   * @param newFilter 新しいフィルター値
   */
  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  /**
   * 期限日の変更時にStateを更新する
   * @param dueDate 期限日
   */
  const handleDueDateChange = (dueDate: Date) => {
    setDueDate(dueDate);
  };

  /**
   * 優先度の変更時にStateを更新する
   * @param e 入力イベント
   */
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as Priority);
  };

  /**
   * カレンダー日付の変更時にStateを更新する
   * @param date カレンダー日付
   */
  const handleSelectedDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  /**
   * ソートの変更時にStateを更新する
   * @param sort ソート
   */
  const handleSortChange = (sort: Sort) => {
    setSort(sort);
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
      dueDate,
      priority,
    };

    // 初期化
    setTodos((todos) => [newTodo, ...todos]);
    setText("");
    setDueDate(new Date());
    setPriority("medium");
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
    dueDate,
    priority,
    sort,
    filteredTodos,
    sortedTodos,
    selectedDate,
    handleTextChange,
    handleFilterChange,
    handleDueDateChange,
    handlePriorityChange,
    handleSelectedDateChange,
    handleSortChange,
    handleSubmit,
    handleTodoUpdate,
    handleEmptyTrash,
  };
};
