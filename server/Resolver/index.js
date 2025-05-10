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