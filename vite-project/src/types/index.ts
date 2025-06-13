/**
 * ToDo
 */
export type Todo = {
  /** ToDoの内容 */
  value: string;
  /** ID（今回はtimestampをIDに使用している） */
  id: number;
  /** 完了状態（true：完了、false：未完了） */
  checked: boolean;
  /** 削除状態（true：削除済、false：未削除） */
  removed: boolean;
  /** 期限日 */
  dueDate: Date;
  /** 優先度 */
  priority: Priority;
};

/**
 * ToDoの表示フィルター
 *  "all": すべてのタスク
 *  "checked": 完了したタスク
 *  "unchecked": 未完了のタスク
 *  "removed": ごみ箱に入っているタスク
 */
export type Filter = "all" | "checked" | "unchecked" | "removed";

/**
 * ToDoの優先度
 *  "low": 低
 *  "medium": 中
 *  "high": 高
 */
export type Priority = "low" | "medium" | "high";
