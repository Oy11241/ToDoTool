import DatePicker from "react-datepicker";
import { Priority } from "../../types";

/**
 * TodoFornコンポーネントのProps
 */
type TodoFormProps = {
  /** 入力テキスト値 */
  text: string;
  /** 入力テキスト値変更時の処理 */
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 優先度 */
  priority: Priority;
  /** 優先度変更時の処理 */
  onPriorityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** カレンダー日付 */
  date: Date;
  /** カレンダ－日付変更時の処理  */
  onCalendarChange: (date: Date) => void;
  /** 追加ボタン押下時の処理 */
  onSubmit: () => void;
};

/**
 * Todoを追加するためのコンポーネント
 *
 * @param text 入力テキスト値
 * @param onTextChange 入力テキスト値変更時の処理
 * @param onSubmit 追加ボタン押下時の処理
 * @return コンポーネント
 */
export const TodoForm = ({
  text,
  onTextChange,
  priority,
  onPriorityChange,
  date,
  onCalendarChange,
  onSubmit,
}: TodoFormProps) => {
  const today = new Date();

  return (
    <form
      className="todo-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="calendar-item-wrapper">
        <label>期限</label>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          locale="ja"
          selected={date}
          minDate={today}
          onChange={(selectedDate) => {
            onCalendarChange(selectedDate || today);
          }}
        />
      </div>
      <div className="priority-wrapper">
        <label>優先度</label>
        <select value={priority} onChange={onPriorityChange}>
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
      </div>
      <input
        type="text"
        className="todo"
        value={text}
        onChange={onTextChange}
        placeholder="新しいタスクを入力..."
      />

      <input type="submit" value="追加" />
    </form>
  );
};
