import "react-calendar/dist/Calendar.css";
import { useTodos } from "../hooks/useTodos";
import { CalendarTodoList } from "../components/calendar/CalendarTodoList";

export const CalendarPage = () => {
  const { todos, selectedDate, handleSelectedDateChange } = useTodos();

  return (
    <CalendarTodoList
      todos={todos}
      selectedDate={selectedDate}
      onSelectedDateChange={handleSelectedDateChange}
    />
  );
};
