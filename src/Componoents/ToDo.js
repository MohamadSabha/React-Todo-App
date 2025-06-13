import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";

// Hooks
import { useContext } from "react";
import { useState } from "react";
import { TodosContext } from "../Contexts/TodosContext";
// in case we used props for [assing single todo from father to parent and an event handler to hande the button click]
// export default function ToDo({ todo, handleclick }) {
//   function handelcheckClick() {
//     handleclick(todo.id);
//   }

// doing the same but with using Use Context

// dialog
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { TransitionProps } from "@mui/material/transitions";

// For Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ToDo({ todo }) {
  // todocontext
  const { Todos, setTodos } = useContext(TodosContext);

  // modals states
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const [openUpdateModal, setopenUpdateModal] = useState(false);

  // both new inputs is handels with one state as an object
  const [UpdatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  const handleDeleteClose = () => {
    setopenDeleteModal(false);
  };
  const handleUpdateClose = () => {
    setopenUpdateModal(false);
  };
  function handelcheckClick() {
    const UpdatedTodos = Todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(UpdatedTodos);
    localStorage.setItem("Todos", JSON.stringify(UpdatedTodos));
  }
  function handelDeleteClick() {
    setopenDeleteModal(true);
  }
  function handelUpdateClick() {
    setopenUpdateModal(true);
  }
  function handelDeleteConfirm() {
    const UpdatedTodos = Todos.filter((t) => {
      if (t.id == todo.id) {
        return false;
      } else return true;

      // return t.id != todo.id;
    });
    setTodos(UpdatedTodos);
    localStorage.setItem("Todos", JSON.stringify(UpdatedTodos));
  }
  function handelUpdateConfirm() {
    const updatedtodos = Todos.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          title: UpdatedTodo.title,
          details: UpdatedTodo.details,
        };
      } else {
        return t;
      }
    });
    setTodos(updatedtodos);
    localStorage.setItem("Todos", JSON.stringify(updatedtodos));

    setopenUpdateModal(false);
  }

  return (
    <>
      <Card
        className={todo.isCompleted ? "todoCardGreen" : "todoCardRed"}
        sx={{
          minWidth: 275,
          background: "#191b1f",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  // textDecoration: todo.isCompleted ? "line-through" : "",
                  textAlign: "left",
                  color: todo.isCompleted ? "#008000" : "#d32f2f",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                style={{
                  fontFamily: "MyFontLight",
                  color: todo.isCompleted ? "white" : "#d32f2f",
                }}
                sx={{ textAlign: "left" }}
              >
                {todo.details}
              </Typography>
            </Grid>

            {/* icons */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                size="small"
                onClick={() => {
                  handelcheckClick();
                }}
                className={
                  todo.isCompleted
                    ? "iconButtonChcekGreen"
                    : "iconButtonChcekRed"
                }
                aria-label="Check"
                style={{
                  color: todo.isCompleted ? "white" : "#d32f2f",
                  background: todo.isCompleted ? "#008000" : "#191b1f",
                  border: todo.isCompleted
                    ? "solid #008000 3px"
                    : "solid #d32f2f 3px",
                }}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
              <IconButton
                className="iconButtonEdit"
                size="small"
                aria-label="edit"
                style={{
                  color: "#1769aa",
                  background: "#191b1f",
                  border: "solid #1769aa 3px ",
                }}
                onClick={() => {
                  handelUpdateClick();
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                className="iconButtonDelete"
                aria-label="delete"
                style={{
                  color: "#ffff00",
                  background: "#191b1f",
                  border: "solid #ffff00 3px ",
                }}
                onClick={() => {
                  handelDeleteClick();
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
        {/* tuggle buttones */}
        {/* Single Todo */}
      </Card>
      {/* Modal delete*/}
      <Dialog
        open={openDeleteModal}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleDeleteClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are You Sure you want to Delet This Task?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This Action Won't be Redone{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handelDeleteConfirm}>Yes Delete</Button>
        </DialogActions>
      </Dialog>
      {/* Modal Update*/}
      <Dialog
        open={openUpdateModal}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleUpdateClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"The new Title and the Details of the task"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Task Title"
            type="email"
            fullWidth
            variant="standard"
            value={UpdatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...UpdatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Task Details"
            type="email"
            fullWidth
            variant="standard"
            value={UpdatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...UpdatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button onClick={handelUpdateConfirm}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
