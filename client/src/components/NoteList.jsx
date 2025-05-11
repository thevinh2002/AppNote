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
import DeleteNote from "./DeleteNote";

export default function NoteList() {
  const { folderId, noteId } = useParams();
  const [activeNoteId, setActiveNoteId] = React.useState(noteId);
  const { folder } = useLoaderData();
  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }
    if (folder?.notes?.[0]) {
      navigate(`note/${folder.notes[0].id}`);
    }
  }, [noteId, folder?.notes]);

  const handleAddNewNote = () => {
    submit(
      {
        content: "",
        folderId,
      },
      { method: "post", action: `/folder/${folderId}` }
    );
  };

  if (!folder) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Loading folder...</Typography>
      </Box>
    );
  }

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
          {(folder.notes || []).map((note) => (
            <Card
              key={note.id}
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
                  "&:last-child": { p: 2 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Link
                    to={`/folder/${folderId}/note/${note.id}`}
                    onClick={() => setActiveNoteId(note.id)}
                    style={{
                      textAlign: "left",
                      flex: 1,
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: note.content.substring(0, 30) || "Empty",
                      }}
                    />

                    <Typography
                      variant="caption"
                      sx={{
                        color: "#6c757d",
                        fontSize: "12px",
                        marginTop: "8px",
                      }}
                    >
                      {moment(note.updatedAt).format("DD/MM/YYYY")}
                    </Typography>
                  </Link>

                  <DeleteNote
                    noteId={note.id}
                    folderId={folderId}
                    isActive={note.id === activeNoteId}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </List>
      </Grid>
      <Grid size={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
