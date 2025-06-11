type TodoFormProps = {
  text: string;
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

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
