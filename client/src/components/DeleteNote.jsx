import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
    Button,
    CircularProgress,
    Alert,
  } from "@mui/material";
  import { DeleteOutlined } from "@mui/icons-material";
  import { useState, useEffect } from "react";
  import { useSearchParams, useNavigate } from "react-router-dom";
    import { deleteNote } from "../utils/NoteUtils"; // bạn cần tạo hàm này
  
  export default function DeleteNote({ noteId, folderId, isActive, onDeleteSuccess }) {
    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    const popupName = searchParams.get("popup");
  
    const handleOpenPopup = () => {
      setError(null);
      setSearchParams({ popup: `delete-note-${noteId}` });
    };
  
    const handleClose = () => {
      setError(null);
      navigate(-1); // Quay lại trang trước
    };
  
    const handleDeleteNote = async () => {
      setIsDeleting(true);
      setError(null);
      try {
        const { success, error } = await deleteNote(noteId);
  
        if (success) {
          onDeleteSuccess?.(noteId);
          if (isActive) {
            navigate(`/folder/${folderId}`);
          }
          handleClose();
        } else {
          setError(error || "Không thể xóa ghi chú.");
        }
      } catch (err) {
        console.error("❌ Lỗi khi xóa note:", err);
        setError(err.message || "Đã xảy ra lỗi khi xóa ghi chú.");
      } finally {
        setIsDeleting(false);
      }
    };
  
    useEffect(() => {
      setOpen(popupName === `delete-note-${noteId}`);
    }, [popupName, noteId]);
  
    return (
      <>
        <Tooltip title="Xóa ghi chú">
          <IconButton size="small" onClick={handleOpenPopup}>
            <DeleteOutlined sx={{ color: "gray" }} />
          </IconButton>
        </Tooltip>
  
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Xác nhận xóa ghi chú</DialogTitle>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <p>Bạn có chắc chắn muốn xóa ghi chú này?</p>
            <p style={{ color: "red" }}>Hành động này không thể hoàn tác.</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={isDeleting}>
              Hủy bỏ
            </Button>
            <Button
              onClick={handleDeleteNote}
              color="error"
              disabled={isDeleting}
              startIcon={isDeleting ? <CircularProgress size={20} /> : null}
            >
              {isDeleting ? "Đang xóa..." : "Xóa ghi chú"}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  