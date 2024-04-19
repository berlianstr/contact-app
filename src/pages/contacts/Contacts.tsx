import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import ListContacts from "../../components/ListContacts";
import {
  useAddContactMutation,
  useDeleteContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from "../../services/api";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

export default function ContactsPage() {
  const { data, isLoading } = useGetContactsQuery();
  const [addContact, restAdd] = useAddContactMutation();
  const [updateContact, restUpdate] = useUpdateContactMutation();
  const [deleteContact, restDelete] = useDeleteContactMutation();
  const [open, setOpen] = React.useState(false);
  const [showSnackbarCreate, setShowSnackbarCreate] = React.useState(false);
  const [showSnackbarUpdate, setShowSnackbarUpdate] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<"add" | "update">("add"); // State to determine dialog mode
  const { register, handleSubmit, reset, setValue } = useForm();
  const [selectedContact, setSelectedContact] = React.useState<any>(null);

  const handleClose = () => {
    setOpen(false);
    setSelectedContact(null);
    setValue("firstName", "");
    setValue("lastName", "");
    setValue("age", "");
    setValue("photo", "");
  };
  const handleSnackbarCloseCreate = () => {
    setShowSnackbarCreate(false);
  };
  const handleSnackbarCloseUpdate = () => {
    setShowSnackbarUpdate(false);
  };

  const onSubmit = async (formData: any) => {
    try {
      if (dialogMode === "add") {
        await addContact(formData);
        setShowSnackbarCreate(true);
      } else {
        await updateContact({ id: selectedContact.id, ...formData }); // Update contact with its ID
        setShowSnackbarUpdate(true);
      }
      handleClose();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: string) => {
    console.log(id);
    deleteContact(id);
  };

  React.useEffect(() => {
    if (dialogMode === "update" && selectedContact) {
      setValue("firstName", selectedContact.firstName);
      setValue("lastName", selectedContact.lastName);
      setValue("age", selectedContact.age);
      setValue("photo", selectedContact.photo);
    }
  }, [dialogMode, selectedContact, setValue]);

  return (
    <div className="App bg-gray-100 min-h-screen flex  justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Contacts
          </h2>
        </div>
        <div className="flex justify-end">
          <Button
            variant="contained"
            onClick={() => {
              setOpen(true);
              setDialogMode("add");
            }}
          >
            Add New Contact
          </Button>
        </div>
        <ListContacts
          data={data?.data!}
          isLoadingDelete={restDelete.isLoading}
          isLoading={isLoading}
          handleDelete={handleDelete}
          setSelectedContact={setSelectedContact}
          setDialogMode={setDialogMode}
          setOpenDialog={setOpen}
        />
        <Snackbar
          open={showSnackbarCreate}
          autoHideDuration={3000}
          onClose={handleSnackbarCloseCreate}
          message={
            restAdd.isSuccess
              ? "Contact created successfully!"
              : "ERROR 400 FROM SERVER"
          }
        />
        <Snackbar
          open={showSnackbarUpdate}
          autoHideDuration={3000}
          onClose={handleSnackbarCloseUpdate}
          message={
            restUpdate.isSuccess
              ? "Contact updated successfully!"
              : "ERROR 400 FROM SERVER"
          }
        />
        <Dialog
          fullWidth={true}
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit(onSubmit),
          }}
        >
          <DialogTitle>
            {dialogMode === "add" ? "Add New Contact" : "Update Contact"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              {...register("firstName")} // Register input with React Hook Form
            />
            <TextField
              autoFocus
              // required
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              {...register("lastName")} // Register input with React Hook Form
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="age"
              label="Age"
              type="number"
              fullWidth
              variant="standard"
              {...register("age", { valueAsNumber: true })} // Register input with React Hook Form
            />
            <TextField
              autoFocus
              // required
              margin="dense"
              id="photo"
              label="Photo"
              type="text"
              fullWidth
              variant="standard"
              {...register("photo")} // Register input with React Hook Form
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              loading={
                dialogMode === "add" ? restAdd.isLoading : restUpdate.isLoading
              }
              type="submit"
              variant="contained"
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
