export const typeDefs = `#graphql
    scalar Date

    type Folder {
        id: String!
        name: String!
        createdAt: String!
        author: Author
        notes: [Note]
    }
    type Note {
        id: String!
        content: String!
        updatedAt: Date
    }

    type Author {
        uid: String!
        name: String!
    }

    type Query {
        folders: [Folder]  # Đây là entry point hợp lệ
        folder(folderId: String!): Folder
        note(noteId: String!): Note
    }
    
    type Mutation {
        updateNote(id: String!, content: String!): Note
        addNote(content: String!, folderId: ID!): Note
        addFolder(name: String!) : Folder
        register(uid: String!, name:String!): Author
        deleteNote(id: String!): Note  
        deleteFolder(id: String!): Folder  
    }
`;
