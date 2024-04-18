import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { IContact } from "../models/contact.model";
import { LoadingButton } from "@mui/lab";

export default function ListContacts({
  data,
  isLoading,
  handleDelete,
  isLoadingDelete,
  setSelectedContact,
  setDialogMode,
  setOpenDialog,
}: {
  data: IContact[];
  isLoading: boolean;
  isLoadingDelete: boolean;
  handleDelete: (id: string) => void;
  setOpenDialog: (isOpen: boolean) => void;
  setDialogMode: (mode: "add" | "update") => void;
  setSelectedContact: (contact: IContact | null) => void;
}) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [contactIdToDelete, setContactIdToDelete] = useState("");
  return (
    <>
      <List sx={{ width: "100%", maxWidth: 600, bgcolor: "background.paper" }}>
        {isLoading && (
          <div className=" flex justify-center">
            <CircularProgress />
          </div>
        )}
        {data?.map((contact: IContact) => (
          <ListItem
            alignItems="flex-start"
            key={contact.id}
            secondaryAction={
              <div>
                <IconButton
                  edge="end"
                  className="flex gap-1"
                  onClick={() => {
                    setSelectedContact(contact);
                    setOpenDialog(true);
                    setDialogMode("update");
                  }}
                >
                  <EditNoteIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setConfirmDialogOpen(true);
                    setContactIdToDelete(contact.id);
                  }}
                  edge="end"
                  className="flex gap-1"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            }
          >
            <ListItemAvatar>
              <Avatar alt={contact.firstName} src={contact.photo} />
            </ListItemAvatar>
            <ListItemText
              primary={`${contact.firstName}  ${contact.lastName}`}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Age
                  </Typography>
                  {` — ${contact.age}`}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
        <Dialog
          open={confirmDialogOpen}
          onClose={() => {
            setConfirmDialogOpen(false);
            setContactIdToDelete("");
          }}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this contact?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setConfirmDialogOpen(false);
                setContactIdToDelete("");
              }}
              color="primary"
            >
              Cancel
            </Button>
            <LoadingButton
              loading={isLoadingDelete}
              onClick={() => {
                handleDelete(contactIdToDelete);
                setConfirmDialogOpen(false);
              }}
              color="error"
              variant="contained"
            >
              Delete
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </List>
    </>
  );
}
