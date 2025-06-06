import {GraphQLScalarType} from 'graphql';
import AuthorModel from "../Models/AuthorModel.js";
import FolderModel from "../Models/FolderModel.js";
import NoteModel from "../Models/NoteModel.js";




export const resolvers = {
    Date : new GraphQLScalarType({
        name: 'Date',
        parseValue(value){
            return new Date(value);
        },
        serialize(value){
            return value.toISOString();
        },
        parseLiteral(ast){
            return ast.value;
        }
    }),
    Query: {

        folders: async (parent, args, context) => {
            const folders = await FolderModel.find({
                authorId: context.uid,
            }).sort({
                updatedAt: 'desc'
            });

            return folders;
        },

        folder: async (parent, args) => {
            const folderId = args.folderId;
            const foundFolder = await FolderModel.findById(folderId);
            return foundFolder;
        },
        note: async(parent, args) => {
            const noteId = args.noteId;
            const note = await NoteModel.findById(noteId)
            return note;
        },
    },

    Folder: {
        author: async (parent) => {
            const authorId = parent.authorId;
            const author = await AuthorModel.findOne({
                uid: authorId
            })
            return author;
        },
        notes: async(parent, args) => {
            const notes = await NoteModel.find({
                folderId: parent.id
            }).sort({
                updatedAt: 'desc'
            });
            console.log(notes);
            return notes;
        },
    },
    Mutation: {
        
        deleteNote: async (parent, { id }, context) => {
            // Kiểm tra xem note có tồn tại và thuộc về user hiện tại không
            const note = await NoteModel.findById(id);
            if (!note) {
                throw new Error('Note not found');
            }

            // Lấy folder chứa note để kiểm tra author
            const folder = await FolderModel.findById(note.folderId);
            if (!folder || folder.authorId !== context.uid) {
                throw new Error('Unauthorized - You can only delete your own notes');
            }

            const deletedNote = await NoteModel.findByIdAndDelete(id);
            return deletedNote;
        },

        deleteFolder: async (parent, { id }, context) => {
            // Kiểm tra folder có tồn tại và thuộc về user hiện tại không
            const folder = await FolderModel.findById(id);
            if (!folder) {
                throw new Error('Folder not found');
            }
            if (folder.authorId !== context.uid) {
                throw new Error('Unauthorized - You can only delete your own folders');
            }

            // Xóa tất cả notes trong folder trước (cascade delete)
            await NoteModel.deleteMany({ folderId: id });

            // Xóa folder
            const deletedFolder = await FolderModel.findByIdAndDelete(id);
            return deletedFolder
        },


        updateNote: async(parent, args)=>{
            const noteId = args.id;
            const updatedNote = await NoteModel.findByIdAndUpdate(noteId, args, { new: true })
            return updatedNote;
        },
        addNote: async(parent,args)=> {
            const newNote = new NoteModel(args)
            await newNote.save();
            return newNote;
        },
        addFolder: async (parent, args, context) => {
            const newFolder = new FolderModel({
                ...args,
                authorId: context.uid,
            });
            await newFolder.save();
            return newFolder;
        },
        register: async (parent, args) => {
            const foundUser = await AuthorModel.findOne({ uid: args.uid })
            if (!foundUser) {
                const newUser = new AuthorModel({ ...args });
                await newUser.save();
                return newUser;
            }
            return foundUser;
        },

    }
};