import { graphQLRequest } from "./request";

// Hàm lấy danh sách notes trong một folder
export const notesloader = async ({ params: { folderId } }) => {
  const query = `query Folder($folderId: String!) {
    folder(folderId: $folderId) {
      id
      name
      notes {
        id
        content
        updatedAt
      }
    }
  }`
    ;

  const data = await graphQLRequest({
    query,
    variables: { folderId },
  });

  return { folder: data?.folder }; // Trả về folder có chứa danh sách notes
};

// Hàm lấy chi tiết một note
export const noteloader = async ({ params: { noteId } }) => {
  const query = `query Note($noteId: String!) {
    note(noteId: $noteId) {
      id
      content
    }
  }`;

  const data = await graphQLRequest({
    query,
    variables: { noteId },
  });

  // Kiểm tra nếu note không tồn tại
  if (!data?.note) {
    return { note: null }; // Nếu không tìm thấy note, trả về null
  }

  return { note: data.note }; // Nếu có note, trả về nó
};


export const addNewNote = async ({ params, request }) => {
  const newNote = await request.formData();
  const formDataObj = {};
  newNote.forEach((value, key) => (
    formDataObj[key] = value
  ))
  const query = `mutation Mutation($content: String!, $folderId: ID!){
  addNote(content: $content, folderId: $folderId){
    id
    content
  }
}`;
const {addNote} = await graphQLRequest({
  query,
  variables: formDataObj
})

  return { addNote };
}

export const updateNote = async ({ params, request }) => {
  const updatedNote = await request.formData();
  const formDataObj = {};
  updatedNote.forEach((value, key) => (
    formDataObj[key] = value
  ))
  const query = `mutation Mutation($id: String!,$content: String!){
  updateNote( id: $id,content: $content)
  {
    id
    content
  }
}`;
const {updateNote} = await graphQLRequest({
  query,
  variables: formDataObj
})
return { updateNote };
}



export const deleteNote = async (noteId) => {
  const query = `mutation DeleteNote($id: String!) {
    deleteNote(id: $id) {
      id
    }
  }`;

  try {
    const result = await graphQLRequest({
      query,
      variables: { id: noteId },
    });

    if (result?.deleteNote) {
      return {
        success: true,
        deletedNote: result.deleteNote,
      };
    } else {
      throw new Error("Failed to delete note.");
    }
  } catch (error) {
    console.error("❌ Lỗi khi xóa note:", error);
    return {
      success: false,
      error: error.message || "Lỗi không xác định",
    };
  }
};

