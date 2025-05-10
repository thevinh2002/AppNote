import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  ContentState,
  convertFromHTML,
  EditorState,
  SelectionState,
  Modifier,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import { useLoaderData, useSubmit, useLocation } from "react-router-dom";
import { debounce } from "@mui/material/utils";

export default function Note() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [rawHTML, setRawHTML] = useState("");
  const { note } = useLoaderData();
  const submit = useSubmit();
  const location = useLocation();
  const debounceRef = useRef();
  const editorRef = useRef();

  // Khởi tạo debounce function chỉ một lần
  useEffect(() => {
    debounceRef.current = debounce((pathname, html, currentNote) => {
      if (html === currentNote.content) return;
      submit(
        {
          ...currentNote,
          content: html,
        },
        { method: "post", action: pathname }
      );
    }, 1000);

    return () => {
      debounceRef.current?.clear();
    };
  }, []);

  useEffect(() => {
    debounceRef.current?.(location.pathname, rawHTML, note);
  }, [rawHTML, location.pathname, note]);

  // Focus editor và đặt con trỏ ở cuối
  const focusEditor = useCallback((editorState) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    
    // Nếu không có nội dung, giữ nguyên selection
    if (contentState.getBlockMap().isEmpty()) {
      return editorState;
    }
    
    // Lấy block cuối cùng
    const lastBlock = contentState.getLastBlock();
    const length = lastBlock.getLength();
    
    // Tạo selection mới ở cuối nội dung
    const newSelection = new SelectionState({
      anchorKey: lastBlock.getKey(),
      anchorOffset: length,
      focusKey: lastBlock.getKey(),
      focusOffset: length,
    });
    
    // Áp dụng selection mới
    return EditorState.forceSelection(
      editorState,
      newSelection
    );
  }, []);

  // Khởi tạo editor state từ note content
  useEffect(() => {
    const initializeEditor = () => {
      if (note?.content) {
        const blocksFromHTML = convertFromHTML(note.content);
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        let newEditorState = EditorState.createWithContent(state);
        newEditorState = focusEditor(newEditorState);
        setEditorState(newEditorState);
        setRawHTML(note.content);
      } else {
        const emptyEditorState = EditorState.createEmpty();
        setEditorState(emptyEditorState);
        setRawHTML("");
        
        // Focus editor khi tạo mới
        setTimeout(() => {
          if (editorRef.current && editorRef.current.editor) {
            editorRef.current.editor.focus();
          }
        }, 0);
      }
    };

    initializeEditor();
  }, [note?.content, focusEditor]);

  const handleOnChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
    const html = stateToHTML(newEditorState.getCurrentContent());
    setRawHTML(html);
  }, []);

  return (
    <div style={{ padding: "16px", height: "100%" }}>
      <Editor
        ref={editorRef}
        editorState={editorState}
        onEditorStateChange={handleOnChange}
        placeholder="Write something..."
        wrapperStyle={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          minHeight: "400px",
          padding: "10px",
        }}
        editorStyle={{
          minHeight: "300px",
          padding: "0 10px",
        }}
      />
    </div>
  );
}