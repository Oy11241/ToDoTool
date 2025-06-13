import { Filter } from "../types";

// フィルタの定義リスト
export const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "全てのタスク" },
  { value: "checked", label: "完了したタスク" },
  { value: "unchecked", label: "現在のタスク" },
  { value: "removed", label: "ごみ箱" },
];

// Todoをローカルストレージに保存する際のキー名
export const LOCAL_STORAGE_KEY = "todo-strage-key";

