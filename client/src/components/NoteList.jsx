import { NoteAddOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Grid,
  List,
  Box,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  Link,
  Outlet,
  useParams,
  useLoaderData,
  useSubmit,
  useNavigate,
} from "react-router-dom";
import moment from "moment";

export default function NoteList() {
  const { folderId, noteId } = useParams();
  const [activeNoteId, setActiveNoteId] = React.useState(noteId);
  const { folder } = useLoaderData();
  const submit = useSubmit();
  const navigate = useNavigate();
  //   const folder = {
  //     notes: [{ id: "1", content: "<p>this is a test note</p>" }],
  //   };
  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }
    if (folder?.notes?.[0]) {
      navigate(`note/${folder?.notes?.[0]?.id}`);
      return;
    }
  }, [noteId, folder.notes]);

  const handleAddNewNote = () => {
    submit(
      {
        content: "",
        folderId,
      },
      { method: "post", action: `/folder/${folderId}` }
    );
  };
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid
        size={4}
        sx={{
          height: "100%",
          bgcolor: "#F0EBE3",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #e0e0e0",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #e0e0e0",
            bgcolor: "#E4DCCF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Note List
          </Typography>
          <Tooltip title="Add Note">
            <IconButton
              onClick={handleAddNewNote}
              size="small"
              sx={{ color: "#576F72" }}
            >
              <NoteAddOutlined />
            </IconButton>
          </Tooltip>
        </Box>

        <List
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 1,
          }}
        >
          {folder.notes.map((note) => {
            return (
              <Link
                key={note.id}
                to={`/folder/${folderId}/note/${note.id}`}
                style={{ textDecoration: "none" }}
                onClick={() => setActiveNoteId(note.id)}
              >
                <Card
                  sx={{
                    mb: 1,
                    "&:hover": {
                      boxShadow: 2,
                      transform: "translateY(-2px)",
                      transition: "all 0.2s ease",
                    },
                    background:
                      note.id === activeNoteId ? "rgb(255 211 140)" : "white",
                  }}
                >
                  <CardContent
                    sx={{
                      "&:last-child": { p: "10px" },
                      p: "10px",
                      display: "flex", // Sử dụng flexbox cho CardContent
                      flexDirection: "column", // Đảm bảo các phần tử được xếp theo chiều dọc
                      alignItems: "flex-start", // Căn chỉnh tất cả các phần tử con về bên trái
                    }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        textAlign: "left",
                      }} // Đảm bảo tiêu đề căn trái
                      dangerouslySetInnerHTML={{
                        __html: note.content.substring(0, 30) || "Empty",
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start", // Căn chỉnh ngày tháng về bên trái
                        padding: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#6c757d", // Màu xám nhẹ
                        }}
                      >
                        {moment(note.updatedAt).format("DD/MM/YYYY")}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid size={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
