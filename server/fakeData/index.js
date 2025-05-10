export default {
  authors: [
    {
      id: "123", // Đổi thành string để khớp schema
      name: "vinh",
    },
    {
      id: "1", // Thêm author này để khớp với folder có authorId: 1
      name: "unknown",
    },
  ],
  folders: [
    {
      id: "1", // Đổi thành string
      name: "Home",
      createdAt: "2022-11-18T03:42:13Z",
      authorId: "123", // Đổi thành string
    },
    {
      id: "2",
      name: "New Folder",
      createdAt: "2022-10-18T03:42:13Z",
      authorId: "1",
    },
    {
      id: "3",
      name: "Work",
      createdAt: "2022-09-18T03:42:13Z",
      authorId: "123",
    },
  ],
  notes: [
    {
      id: "123",
      content: "<p>go to the supermarket</p>",
      folderId:"1"
    },
    {
      id: "234",
      content: "<p>go to the aparment</p>",
      folderId:"1"
    },
    {
      id: "123",
      content: "<p>go to the school</p>",
      folderId:"2"
    },
  ],
};