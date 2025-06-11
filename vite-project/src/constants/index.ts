import { Filter } from "../types";

export const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "すべてのタスク" },
  { value: "checked", label: "完了したタスク" },
  { value: "unchecked", label: "現在のタスク" },
  { value: "removed", label: "ごみ箱" },
];

export const LOCAL_STORAGE_KEY = "todo-strage-key";
