import { Card, CardContent, List, Typography, Box, IconButton, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import NewFolder from "./NewFolder";
import DeleteFolder from "./DeleteFolder";

export default function FolderList({ folders = [], onFolderDeleted }) {
  const { folderId } = useParams();
  const [activeFolderID, setActiveFolderID] = useState(folderId);

  const handleDeleteSuccess = (deletedFolder) => {
    console.log("Đã xóa folder:", deletedFolder);
    onFolderDeleted?.(deletedFolder); // Gọi callback từ component cha
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "#7D9D9C",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
          Folders
        </Typography>
        <NewFolder />
      </Box>

      <List
        disablePadding
        sx={{
          flexGrow: 1,
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#576F72",
            borderRadius: "3px",
          },
        }}
      >
        {folders.map(({ id, name }) => (
          <Card
            key={id}
            sx={{
              mb: 2,
              borderRadius: 1,
              bgcolor: "#fff",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                transform: "translateY(-2px)",
                transition: "all 0.2s ease-in-out",
              },
              background: id === activeFolderID ? "rgb(255 211 140)" : "white",
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Link
                to={`/folder/${id}`}
                style={{ 
                  textDecoration: "none",
                  flexGrow: 1,
                }}
                onClick={() => setActiveFolderID(id)}
              >
                <CardContent sx={{ px: 2, py: 1.5 }}>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    fontSize={16}
                    fontWeight={"bold"}
                    textAlign={"left"}
                  >
                    {name}
                  </Typography>
                </CardContent>
              </Link>
              
              {id === activeFolderID && (
                <Box sx={{ pr: 1 }}>
                  <DeleteFolder
                    folderId={id}
                    folderName={name}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                </Box>
              )}
            </Stack>
          </Card>
        ))}
      </List>
    </Box>
  );
}