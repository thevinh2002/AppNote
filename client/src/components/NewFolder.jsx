import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CreateNewFolderOutlined } from "@mui/icons-material";
import { useSearchParams, useNavigate } from "react-router-dom";
import React from "react";
import { addNewFolder } from "../utils/FoldersUtils";

export default function NewFolder() {
  const [newFolderName, setNewFolderName] = useState();
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const popupName = searchParams.get("popup");
  const handleOpenPopup = () => {
    // setOpen(true);
    setSearchParams({ popup: "add-folder" });
  };

  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value);
  };
  const handleClose = () => {
    setNewFolderName("");
    navigate(-1)
  };
  const handleAddNewFolder = async () => {
    const { addFolder } = await addNewFolder({ name: newFolderName });
    console.log(addFolder);
    handleClose();
  };

  useEffect(() => {
    if (popupName === "add-folder") {
      setOpen(true);
      return;
    }
    setOpen(false);
  }, [popupName]);

  return (
    <div>
      <Tooltip title="Add folder">
        <IconButton size="small" onClick={handleOpenPopup}>
          <CreateNewFolderOutlined sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullWidth
            size="small"
            variant="standard"
            sx={{ width: "400px" }}
            autoComplete="off"
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
