/**
 * TodoFornコンポーネントのProps
 */
type TodoFormProps = {
  /** 入力テキスト値 */
  text: string;
  /** 入力テキスト値変更時の処理 */
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
export const TodoForm = ({ text, onTextChange, onSubmit }: TodoFormProps) => {
  return (
    <form
      className="todo-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="text"
        value={text}
        onChange={onTextChange}
        placeholder="新しいタスクを入力..."
      />
      <input type="submit" value="追加" />
    </form>
  );
};
