import ActivityGroupPage from "../pages/ActivityGroup";
import TodoListPage from "../pages/TodoList";

export const routers = [
  {
    path: "/",
    element: <ActivityGroupPage />,
  },
  {
    path: "/detail/:id",
    element: <TodoListPage />,
  },
];
