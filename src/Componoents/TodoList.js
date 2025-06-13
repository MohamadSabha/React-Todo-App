import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AddIcon from "@mui/icons-material/Add"; // Import the plus icon

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { useContext, useState, useEffect } from "react";
import { TodosContext } from "../Contexts/TodosContext";

import { v4 as uuidv4 } from "uuid";

// component
import ToDo from "./ToDo";
import { styled } from "@mui/material";
const ToggleButtonCompleted = styled(ToggleButton)(({ theme }) => ({
  "&.Mui-selected": {
    "&.Mui-selected": {
      backgroundColor: "#2e7d326b", // Orange selected
      color: "white",
    },
  },
}));
const ToggleButtonUncompleted = styled(ToggleButton)(({ theme }) => ({
  "&.Mui-selected": {
    "&.Mui-selected": {
      backgroundColor: "#ff00008c", // red selected
      color: "white",
    },
  },
}));
const ToggleButtonAll = styled(ToggleButton)(({ theme }) => ({
  "&.Mui-selected": {
    "&.Mui-selected": {
      backgroundColor: "#1769aa6b", // Blue selected
      color: "white",
    },
  },
}));

const DarkTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: "white", // White text
  },
  "& .MuiInputLabel-root": {
    color: "gray", // Label color when not focused
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray", // Default border
    },
    "&:hover fieldset": {
      borderColor: "lightgray", // Hover border
    },
    "&.Mui-focused fieldset": {
      borderColor: "white", // Focused border
    },
  },
}));
export default function ToDoList() {
  const [TitleInput, SetTitleInput] = useState("");
  const [DetailsInput, SetDetailsInput] = useState("");
  const { Todos, setTodos } = useContext(TodosContext);
  const [DisplayedTodoType, setDisplayedTodoType] = useState("All");

  // Filtering the todos list based on the status
  let TodosAfterFiltering = Todos;

  const CompletedTodos = Todos.filter((t) => {
    return t.isCompleted;
  });
  const UnCompletedTodos = Todos.filter((t) => {
    return !t.isCompleted;
  });
  if (DisplayedTodoType == "Completed") {
    TodosAfterFiltering = CompletedTodos;
  } else if (DisplayedTodoType == "UnCompleted") {
    TodosAfterFiltering = UnCompletedTodos;
  } else {
    TodosAfterFiltering = Todos;
  }

  const AllTodos = TodosAfterFiltering.map((t) => {
    return <ToDo key={t.id} todo={t} />;
  });

  function HandleChangedDisplayedType(e) {
    setDisplayedTodoType(e.target.value);
  }
  useEffect(() => {
    const StorageTodos = JSON.parse(localStorage.getItem("Todos")) ?? [];
    setTodos(StorageTodos);
  }, []);
  function HandleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: TitleInput,
      details: DetailsInput,
      isCompleted: false,
    };
    const updatedtodos = [newTodo, ...Todos];
    setTodos(updatedtodos);
    SetTitleInput("");
    SetDetailsInput("");
    localStorage.setItem("Todos", JSON.stringify(updatedtodos));
  }

  return (
    <>
      <Container maxWidth="md" style={{ color: "white !important" }}>
        <Card
          className="MyCardContent"
          sx={{ minWidth: 275 }}
          // style={{ maxHeight: "80vh", overflow: "scroll" }}
          style={{ marginTop: "30px" }}
        >
          <Typography
            style={{
              marginBottom: "10px",
              color: "white",
            }}
            variant="h3"
          >
            My Task List
            <PlaylistAddCheckIcon
              fontSize="large"
              style={{
                color: "#388e3c",
                marginLeft: "10px",
              }}
            />
          </Typography>

          <Divider variant="fullWidth" style={{ background: "#5e5a5a" }} />

          <CardContent>
            {/* tuggle buttones */}
            <ToggleButtonGroup
              className="ToggleButtonGroup"
              value={DisplayedTodoType}
              exclusive
              onChange={HandleChangedDisplayedType}
              aria-label="text alignment"
            >
              <ToggleButtonAll
                style={{ borderColor: "#ffffff63", color: "white" }}
                value="All"
                aria-label="right aligned"
              >
                All ({Todos.length})
              </ToggleButtonAll>
              <ToggleButtonCompleted
                style={{ borderColor: "#ffffff63", color: "white" }}
                value="Completed"
                aria-label="left aligned"
              >
                Completed ({CompletedTodos.length})
              </ToggleButtonCompleted>
              <ToggleButtonUncompleted
                style={{ borderColor: "#ffffff63", color: "white" }}
                value="UnCompleted"
                aria-label="centered"
              >
                Un-Completed ({UnCompletedTodos.length})
              </ToggleButtonUncompleted>
            </ToggleButtonGroup>
            {/* Single Todo */}
            {/* INPUT + ADD BUTTON */}

            <Grid container style={{ marginTop: "20px" }} spacing={2}>
              <Grid
                size={10}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <DarkTextField
                  style={{ width: "100%", marginRight: "10px" }}
                  id="outlined-basic"
                  label="Write your next task"
                  variant="outlined"
                  value={TitleInput}
                  onChange={(e) => {
                    SetTitleInput(e.target.value);
                  }}
                />
                <DarkTextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Details"
                  variant="outlined"
                  value={DetailsInput}
                  onChange={(e) => {
                    SetDetailsInput(e.target.value);
                  }}
                />
              </Grid>

              <Grid
                size={2}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  color="success"
                  className="AddButton"
                  style={{ width: "100%", height: "100%" }}
                  variant="outlined"
                  onClick={() => {
                    HandleAddClick();
                  }}
                  sx={{
                    "&.Mui-disabled": {
                      background: "#cccccc", // Gray background when disabled
                      color: "#666666", // Dark gray text when disabled
                    },
                  }}
                  disabled={TitleInput.length == 0 || DetailsInput.length == 0}
                >
                  Add {<AddIcon />}
                </Button>
              </Grid>
            </Grid>
            {/*== INPUT + ADD BUTTON ==*/}
            {AllTodos}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
