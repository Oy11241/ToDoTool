import { Todo } from "../types";

/**
 * 任意の値がTodo型であるかを判定する
 *
 * @param arg 判定対象の値
 * @return arg is Todo 判定結果
 */
const isTodo = (arg: any): arg is Todo => {
  return (
    typeof arg === "object" &&
    typeof arg.id === "number" &&
    typeof arg.value === "string" &&
    typeof arg.checked === "boolean" &&
    typeof arg.removed === "boolean" &&
    typeof arg.dueDate === "object" &&
    typeof arg.priority === "string"
  );
};

/**
 * 任意の値がTodo[]型であるかを判定する
 *
 * @param arg 判定対象の値
 * @return 判定結果
 */
export const isTodos = (arg: any): arg is Todo[] => {
  return Array.isArray(arg) && arg.every(isTodo);
};
