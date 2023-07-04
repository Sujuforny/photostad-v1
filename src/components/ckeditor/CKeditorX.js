"use client";

import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import { headers } from "next/dist/client/components/headers";
import { useState } from "react";

const UPLOAD_SINGLE_FILE_API = `http://localhost:8080/api/v1/files/uploaded-single`;



const handleEditorChange = (event, editor) => {
  const data = editor.getData();
  setEditorData(data);
};

const handleFileUpload = async (file) => {



  // using axios for uploading
  const formData = new FormData();
  formData.append("file", file);
  try {
    const respone = await axios.post(
        "http://136.228.158.126:8002/api/v1/files",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (respone) {
      const imageUrl = await response.text();
      const editor = editorData.replace(
        `<img[^>]+>`,
        `<img src="${imageUrl}"/>`
      );
      setEditorData(editor);
      return respone?.data?.location;
    }
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const [data, setData] = useState("");
  return (
    <div className="App shadow">
      {/* <h2>CKEditor 5 using a custom build - decoupled editor</h2> */}
      {data}
      <CKEditor
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);
          // Disable the plugin so that no toolbars are visible.
          editor.plugins.get("TextTransformation").isEnabled = false;
          editor.plugins.get("FileRepository").createUploadAdapter = (
            loader
          ) => {
            return {
              upload: async () => {
                const file = await loader.file;
                const url = await handleFileUpload(file); //upload file to server
                const formData = new FormData();
                formData.append("file",file);
                try {
                  const respone = await axios.post(
                    "http://136.228.158.126:8002/api/v1/files",
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                  if (respone) {
                    const imageUrl = await response.text();
                    const editor = editorData.replace(
                      `<img[^>]+>`,
                      `<img src="${imageUrl}"/>`
                    );
                    setEditorData(editor);
                    // return respone?.data?.location;
                    return {
                      defaullt: `http://136.228.158.126:8002/api/v1/files/${respone.data.name}`
                    };
                  }
                } catch (error) {
                  console.log(error);
                }

              },
            };
          };
          // Insert the toolbar before the editable area.
          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            );
        }}
        onError={(error, { willEditorRestart }) => {
          // If the editor is restarted, the toolbar element will be created once again.
          // The `onReady` callback will be called again and the new toolbar will be added.
          // This is why you need to remove the older toolbar.
          if (willEditorRestart) {
            this.editor.ui.view.toolbar.element.remove();
          }
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
          setData(data);
        }}
        editor={DecoupledEditor}
        // data="<p>Hello from CKEditor 5's decoupled editor!</p>"
        config={{ placeholder: "Text here..." }}
      />
      {data}
    </div>
  );
}
export default App;
