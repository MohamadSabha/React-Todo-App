import "./App.css";
// import "./MyStyle.css";

import TodoList from "./Componoents/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./Contexts/TodosContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Initialtodos = [
  {
    id: uuidv4(),
    title: "read a book",
    details: "i should read a book this weak",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "read a go to gym",
    details: "i should go to gym",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "finish the project",
    details: "i should finish the project",
    isCompleted: false,
  },
];

const theme = createTheme({
  typography: {
    fontFamily: ["MyFontBold"],
  },
  palette: {
    primary: { main: "#388e3c" },
  },
});
function App() {
  const [Todos, setTodos] = useState(Initialtodos);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          justifyContent: "center",
          minHeight: "100vh",
          alignItems: "center",
          backgroundColor: "#191b1f",
          display: "flex",
        }}
      >
        <TodosContext.Provider value={{ Todos: Todos, setTodos: setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
