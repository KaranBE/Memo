import React, { useEffect, useState } from "react";
import NoteItem from "../components/NoteItem";
import { getMyNotes } from "../functions";
import Box from "@mui/material/Box";
import AddNotes from "../components/AddNotes";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    fetchMyNotes();
  }, []);

  const onSubmit = (newNote) => {
    setNotes([newNote, ...notes]);
    setIsModalOpen(false);
    setIsSuccess(true);
  };

  const onDelete = (id) => {
    const newList = notes.filter((item) => item.id !== id);
    setNotes(newList);
  };

  const fetchMyNotes = async () => {
    const response = await getMyNotes();
    setNotes(response);
  };

  return (
    <Box>
      <Snackbar
        open={isSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setIsSuccess(false)}
      >
        <Alert variant="filled" severity="success">
          Note added successfully
        </Alert>
      </Snackbar>
      <Typography
        variant="h1"
        md={{ my: 3 }}
        sx={{ fontSize: "40px", my: 2, mr: "50px" }}
      >
        Your Sticky Notes
      </Typography>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddNotes onSubmit={onSubmit} />
      </Modal>
      <Grid alignItems={"stretch"} container spacing={2}>
        {notes.map((note, index) => (
          <Grid item xs={12} md={4}>
            <NoteItem
              note={note}
              key={index}
              onDelete={onDelete}
              onUpdate={fetchMyNotes}
            />
          </Grid>
        ))}
      </Grid>
      <Fab
        className="float-button"
        color="primary"
        onClick={() => setIsModalOpen(true)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
