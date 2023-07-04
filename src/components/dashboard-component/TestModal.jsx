// components/TutorialModal.js
import FormAddTTR from '@/app/test/page';
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";


const validationSchema = Yup.object({
  description: Yup.string().required("កាក​​ មិនអាចទទេបានទេ"),
  name: Yup.string().required("កាក​​ មិនអាចទទេបានទេ"),

  // Yub.mixed() for upload file with diferent type format
  file: Yup.mixed()
    .test("fileSize", " File ធំជាង 5MB", (value) => {
      if (!value) {
        return true;
      }
      return value.size <= FILE_SIZE;
    })
    .test("filsFormat", "Unsupported format", (value) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .required("required"),
});

// for upload file
const FILE_SIZE = 1024 * 1024 * 5; // 5MB

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/webp",
  "application/pdf",
];
const TutorialModal = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  const handleSubmit = (e) => {


    // Perform actions with the form data
    console.log({ title, description, thumbnail, htmlContent });
    alert('Tutorial Submitted!');
    closeModal(); // Close the modal
  };
   const [isLoading, setIsLoading] = useState(false);
    // end of formik section
    const editorRef = React.useRef();
    const [editorLoaded, setEditorLoaded] = React.useState(false);
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    React.useEffect(() => {
      editorRef.current = {
        CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
        ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      };
      setEditorLoaded(true);
    }, []);
    //ckeditor section
    const [editorData, setEditorData] = React.useState("Hello PhotoStad");
  
    const handleEditorChange = (newData) => {
      setEditorData(newData);
    }

  // for submit to server
  const createNewUser = async (tutorial) => {
    const { name, description } = tutorial;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      name,
      thumbnail: "5",
      createdBy: "32",
      description,
      htmlContent: editorData,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://136.228.158.126:8002/api/v1/tutorials", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  // end of submit to server

  // upload file

  const uploadImage = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://136.228.158.126:8002/api/v1/files`,
        values.file
      );
      console.log(response);
      alert("Image uploaded successfully");

      return (
        response.data.location ||
        "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Formik
      initialValues={{
        name: "",
        description: "",
        thumbnail: "5",
        createdBy: "32",
        htmlContent: " ",
        file: undefined,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values,  { setSubmitting, resetForm }) => {

        const formData = new FormData();
        formData.append("file", values.file);

        const avatar = await uploadImage({ file: formData });
        console.log("avatar", avatar);

        values.avatar = avatar;
        setTimeout(() => {
          createNewUser(values);
          setSubmitting(false);
          resetForm();
        }, 500);
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <div className="flex justify-center w-full my-10">
          <Form>
            <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-5">
              <div className=" w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </label>
                <Field
                  type="text"
                  name="name"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                />
                <ErrorMessage
                  name="name"
                  component="h1"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* file for avarta */}
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Thumbnail
                </label>
                <Field
                  className="file-input h-[45px]  file-input-bordered w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="file"
                  type="file"
                  title="Select a file"
                  setFieldValue={setFieldValue} // Set Formik value
                  component={CustomInput} // component prop used to render the custom input
                  isSubmitting={isSubmitting}
                />
                <ErrorMessage
                  name="file"
                  component="h1"
                  className="text-red-500 text-xs italic"
                />
              </div>
              {/* email */}
              <div className="md:mb-5 mb-2 md:col-span-2 w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <Field
                  type="text"
                  name="description"
                  component="textarea"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="បញ្ជូល email អ្នកប្រើប្រាស់"
                />
                <ErrorMessage
                  name="description"
                  component="h1"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className={"z-50 mt-3 rounded-main h-[100vh]"}>
                {editorLoaded ? (
                  <CKEditor
                    editor={ClassicEditor}
                    data={editorData}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      handleEditorChange(data);
                      setEditorData(data);
                      console.log({ event, editor, data });
                    }}
                  />
                ) : (
                  " ckeditor is  laoding..."
                )}
                <div className="flex justify-end ">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-main px-5 max-sm:px-2 p-2.5 bg-black text-white   mt-5"
                  >
                    Post Now
                  </button>
                </div>
              </div>
              {/* <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full  "
              >
                submit
              </button> */}
            </div>
          </Form>
        </div>
      )}
    </Formik>
      <form onSubmit={handleSubmit}>
 
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
function CustomInput({ field, form, isSubmitting, ...props }) {
  const [preview, setPreview] = useState(null);
  // for reset imageds
  useEffect(() => {
    if (isSubmitting) {
      setPreview(null);
    }
  }, [isSubmitting]);
  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          form.setFieldValue(field.name, event.currentTarget.files[0]);
          setPreview(URL.createObjectURL(event.currentTarget.files[0]));
        }}
        // {...props} is use to pass all props from Formik Field component
        {...props}
      />
      {preview && (
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={preview} alt="dummy" width="100" height="100" />
          </div>
        </div>
      )}
    </div>
  );
}

export default TutorialModal;