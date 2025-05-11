import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@mui/icons-material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { deleteFolder } from "../utils/FoldersUtils";

export default function DeleteFolder({
  folderId,
  folderName,
  onDeleteSuccess,
}) {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const popupName = searchParams.get("popup");

  const handleOpenPopup = () => {
    setError(null); // Reset error khi mở popup
    setSearchParams({ popup: "delete-folder" });
  };

  const handleClose = () => {
    setError(null);
    navigate(-1);
  };

  const handleDeleteFolder = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const { success, error, deletedFolder } = await deleteFolder(folderId);

      if (success) {
        onDeleteSuccess?.(deletedFolder); // Truyền thông tin folder đã xóa
        handleClose();
      } else {
        setError(error || "Không thể xóa folder");
      }
    } catch (err) {
      console.error("❌ Lỗi khi xóa folder:", err);
      setError(err.message || "Đã xảy ra lỗi khi xóa folder");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (popupName === "delete-folder") {
      setOpen(true);
      return;
    }
    setOpen(false);
  }, [popupName]);

  return (
    <div>
      <Tooltip title="Xóa folder">
        <IconButton size="small" onClick={handleOpenPopup}>
          <DeleteOutlined sx={{ color: "black" }} />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận xóa folder</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <p>
            Bạn có chắc muốn xóa folder <strong>"{folderName}"</strong>?
          </p>
          <p style={{ color: "red" }}>
            Lưu ý: Tất cả nội dung bên trong sẽ bị xóa vĩnh viễn!
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isDeleting}>
            Hủy bỏ
          </Button>
          <Button
            onClick={handleDeleteFolder}
            color="error"
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={20} /> : null}
          >
            {isDeleting ? "Đang xóa..." : "Xóa vĩnh viễn"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
