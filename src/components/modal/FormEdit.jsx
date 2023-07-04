"use client";
import { BASE_URL } from "@/app/api/BaseAPI";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik, insert } from "formik";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  // description: Yup.string().required("Description is required"),
  // name: Yup.string().required("Name is required"),

  // Yub.mixed() for upload file with diferent type format
  file: Yup.mixed()
    .test("fileSize", " File bigger than 5mb", (value) => {
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
    }),
});

// for upload file
const FILE_SIZE = 1024 * 1024 * 5; // 5MB

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/webp",
];

export default function FormEdit({ id, closeModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = React.useRef();
  const [editorData, setEditorData] = React.useState("Hello PhotoStad");
  const [tutorial, setTutorial] = useState({
    name: " ",
    description: "",
    htmlContent: "",
    thumbnail: "5",
  });
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

  const handleEditorChange = (newData) => {
    setEditorData(newData);
  };

  const handlInputChage = (e) => {
    let data = { ...tutorial };
    data[e.target.name] = e.target.value;
    setTutorial(data);
  };

  const getTutorialById = async (id) => {
    axios
      .get(`${BASE_URL}tutorials/${id}`)
      .then((response) => {
        const data = response.data.data;
        setTutorial(data);
        setEditorData(data.htmlContent);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const onSubmit = async (e) => {
    await axios.put(`${BASE_URL}tutorials/${id}`, tutorial);
    toast.success("Tutorial Updated successfully");
  };

  useEffect(() => {
    getTutorialById(id);
  }, [id]);

  function stringToSlug(str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // for submit to server
  const updateTutorial = async (tutorial) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      title: tutorial.name,
      name: tutorial.name,
      slug: stringToSlug(tutorial.description),
      description: tutorial.description,
      thumbnail: "5",
      htmlContent: editorData,
    });

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      fetch(`${BASE_URL}tutorials/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          toast.success("Tutorial Updated successfully");
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  // end of submit to server
  // find image id by its name
  const [imageName, setImageName] = useState("");
  const handleFindImageId = async (name) => {
    try {
      const response = await axios.get(`${BASE_URL}files?name=${name}`);
      console.log(response.data.data[0].id, "response");
      return response.data.data[0].id;
    } catch (err) {
      console.log(err.message);
    }
  };

  // upload file
  const uploadImage = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://136.228.158.126:8002/api/v1/files`,
        values.file
      );
      console.log("response", response.data.location);

      return (
        response.data.location ||
        "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" bg-white dark:bg-secondary  w-full ">
      <h2 className="text-center text-2xl  text-light dark:text-white font-semibold">
        Update Tutorial
      </h2>
      <ToastContainer />
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: tutorial.name,
          description: tutorial.description,
          thumbnail: tutorial.thumbnail,
          createdBy: "32",
          htmlContent: tutorial.htmlContent,
          file: undefined,
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          formData.append("file", values.file);

          const avatar = await uploadImage({ file: formData });

          values.avatar = avatar;
          setTimeout(() => {
            updateTutorial(values);
            setSubmitting(false);
            resetForm();
          }, 500);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-5">
              <div className=" w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </label>
                <Field
                  onChange={(e) => handlInputChage(e)}
                  type="text"
                  name="name"
                  value={values.name}
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
                  onChange={(e) => handlInputChage(e)}
                  value={values.description}
                  type="text"
                  name="description"
                  component="textarea"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="description"
                />
                <ErrorMessage
                  name="description"
                  component="h1"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className={"z-50 mt-3 rounded-main col-span-2 w-full"}>
                {editorLoaded ? (
                  <CKEditor
                    editor={ClassicEditor}
                    data={editorData}
                    config={{
                      ckfinder: {
                        uploadUrl: `${BASE_URL}files`,
                      },
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      handleEditorChange(data);
                      setEditorData(data);
                      console.log({ event, editor, data });
                    }}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                      editor.plugins.get("FileRepository").createUploadAdapter =
                        (loader) => {
                          return {
                            upload: async () => {
                              const file = await loader.file;
                              const url = await handleFileUpload(file);
                              const formData = new FormData();
                              formData.append("file", file);
                              const res = await axios.post(
                                `${BASE_URL}files`,
                                formData,
                                {
                                  headers: {
                                    "Content-Type": "multipart/form-data",
                                  },
                                }
                              );
                              console.log("res", res);
                              if (res) {
                                const imageUrl = await res.data.data.url;
                                const editor = editorData.replace(
                                  `<img[^>]+>`,
                                  `<img src="${imageUrl}"/>`
                                );
                                setEditorData(editor);
                                // return respone?.data?.location;
                                return {
                                  defaullt: res.data.data.url,
                                };
                              }
                            },
                          };
                        };
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
                    Update
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const handleFileUpload = async (file) => {
	const formData = new FormData()
	formData.append("file", file)
	try {
		const res = await axios.post(
			"http://136.228.158.126:8002/api/v1/files",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		)
		if (res) {
			
			const imageUrl = await res.data.data.url
			console.log(imageUrl,'imageUrl');
			const editor = editorData.replace(
				`<img[^>]+>`,
				`<img src="${imageUrl}"/>`
			)
			setEditorData(editor)
			return res?.data?.location
		}
	} catch (err) {
		console.log(err)
	}
}


// do drag and drop and preview image
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
          <div className="w-24 rounded-main mt-5">
            <img src={preview} alt="dummy" width="100" height="100" />
          </div>
        </div>
      )}
    </div>
  );
}
