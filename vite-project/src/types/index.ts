export type Todo = {
  value: string;
  id: number;
  checked: boolean;
  removed: boolean;
  dueDate?: Date; // 期限日を追加
  priority?: 'low' | 'medium' | 'high'; // 優先度を追加
};

export type Filter = "all" | "checked" | "unchecked" | "removed";
