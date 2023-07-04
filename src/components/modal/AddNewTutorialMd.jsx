"use client"
import { BASE_URL } from "@/app/api/BaseAPI"
import { CKEditor } from "@ckeditor/ckeditor5-react"

import axios from "axios"
import { ErrorMessage, Field, Form, Formik, insert } from "formik"
import React, { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import * as Yup from "yup"

const validationSchema = Yup.object({
	description: Yup.string().required("Description is required"),
	name: Yup.string().required("Name is required"),

	// Yub.mixed() for upload file with diferent type format
	file: Yup.mixed()
		.test("fileSize", " File bigger than 5mb", (value) => {
			if (!value) {
				return true
			}
			return value.size <= FILE_SIZE
		})
		.test("filsFormat", "Unsupported format", (value) => {
			if (!value) {
				return true
			}
			return SUPPORTED_FORMATS.includes(value.type)
		})
		.required("required"),
})

// for upload file
const FILE_SIZE = 1024 * 1024 * 5 // 5MB

const SUPPORTED_FORMATS = [
	"image/jpg",
	"image/jpeg",
	"image/gif",
	"image/png",
	"image/webp",
]

export default function FormAddTTR({closeModal}) {

	const [imageId, setImageId] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [editorLoaded, setEditorLoaded] = React.useState(false)
	const [image, setImage] = useState("")
	const editorRef = React.useRef()
	const { CKEditor, ClassicEditor } = editorRef.current || {}

	React.useEffect(() => {
		editorRef.current = {
			CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
			ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
		}
		setEditorLoaded(true)
	}, [])
	//ckeditor section
	const [editorData, setEditorData] = React.useState("Hello PhotoStad")

	const handleEditorChange = (newData) => {
		setEditorData(newData)
	}

	const uploadImage = async (values) => {
		setIsLoading(true)
		try {
			const response = await axios.post(
				`http://136.228.158.126:8002/api/v1/files`,
				values.file
			);
			console.log("respone : ", response)
			if (response.status === 200) {
				const responeData = await response.data.data;
				const name = responeData.name;
				setImage(name);
				//check if image is uploaded send it server with anothe url
				if (responeData.name) {
					await handleInsertImgToServer(name)
				}

				return (
					response.data.location ||
					"https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
				)
			}

		} catch (error) {
			toast.error('Failed to upload image. Please try again later.')
			console.log("error : ", error)
		}
	}

	// insert image to server
	const handleInsertImgToServer = async (image) => {

		let myHeaders = new Headers()
		myHeaders.append("Content-Type", "application/json")
		let raw = JSON.stringify({
			name: image,
			type: "user",
		})

		let requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		}
		try {

			const respone = await fetch("http://136.228.158.126:8002/api/v1/images", requestOptions);
			const responeData = await respone.json();
			const imgId = responeData.data.id;
			setImageId(imgId);

		} catch (error) {
			console.log("error : " + error);
		}

	}

	// for submit to server
	const addNewTutotial = async (tutorial) => {

		const { name, description } = tutorial
		let myHeaders = new Headers()
		
		myHeaders.append("Content-Type", "application/json")
		let raw = JSON.stringify({
			name,
			thumbnail: imageId,
			createdBy: "32",
			description,
			htmlContent: editorData,
		})

		let requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		}

		try {
			const response = await fetch(`${BASE_URL}tutorials`, requestOptions);
			const result = await response.json();
			toast.success("Tutorial created successfully");
			console.log("result : ", result);
			closeModal();
		} catch (error) {
			toast.error(error.message);
			console.log("error", error);
		}
	}
	// end of submit to server

	return (
		<div className=' bg-white dark:bg-secondary  w-full '>
			<h2 className='text-center text-2xl  text-light dark:text-white font-semibold'>
				Create Tutorial
			</h2>
			<ToastContainer />

			<Formik
				initialValues={{
					name: "",
					description: "",
					thumbnail: imageId,
					createdBy: "32",
					htmlContent: " ",
					file: undefined,
				}}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					const formData = new FormData()
					formData.append("file", values.file)

					const avatar = await uploadImage({ file: formData })
					console.log("avatar", avatar)

					values.avatar = avatar

					// setTimeout(() => {
						addNewTutotial(values)
						setSubmitting(false)
						resetForm()
					// }, 500)
				}}
			>

				{({ isSubmitting, setFieldValue }) => (
					<Form>
						<div className='grid grid-cols-1 mt-10 md:grid-cols-2 gap-5'>
							<div className=' w-full'>
								<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
									Title
								</label>
								<Field
									type='text'
									name='name'
									className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='John'
								/>
								<ErrorMessage
									name='name'
									component='h1'
									className='text-red-500 text-xs italic'
								/>
							</div>
							{/* file for avarta */}
							<div className='w-full'>
								<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
									Thumbnail
								</label>
								<Field
									className='file-input h-[45px]  file-input-bordered w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									name='file'
									type='file'
									title='Select a file'
									setFieldValue={setFieldValue} // Set Formik value
									component={CustomInput} // component prop used to render the custom input
									isSubmitting={isSubmitting}
								/>
								<ErrorMessage
									name='file'
									component='h1'
									className='text-red-500 text-xs italic'
								/>
							</div>
							{/* email */}
							<div className='md:mb-5 mb-2 md:col-span-2 w-full'>
								<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
									Description
								</label>
								<Field
									type='text'
									name='description'
									component='textarea'
									rows='4'
									className='block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='description'
								/>
								<ErrorMessage
									name='description'
									component='h1'
									className='text-red-500 text-xs italic'
								/>
							</div>
							<div className={"z-50 mt-3 rounded-main col-span-2 w-full"}>
								{editorLoaded ? (
									<CKEditor
										editor={ClassicEditor}
										data={editorData}
										// call base64 image upload function here
										config={{
											ckfinder: {
												uploadUrl: "http://136.228.158.126:8002/api/v1/files",
											},
										}}
										onChange={(event, editor) => {
											const data = editor.getData()
											handleEditorChange(data)
											setEditorData(data)
											console.log({ event, editor, data })
										}}
										onReady={(editor) => {
											// You can store the "editor" and use when it is needed.
											console.log("Editor is ready to use!", editor)
											editor.plugins.get("FileRepository").createUploadAdapter =
												(loader) => {
													return {
														upload: async () => {
															const file = await loader.file
															const url = await handleFileUpload(file)
															const formData = new FormData()
															formData.append("file", file)
															const res = await axios.post(
																`${BASE_URL}files`,
																formData,
																{
																	headers: {
																		"Content-Type": "multipart/form-data",
																	},
																}
															)
															console.log("res", res)
															if (res) {
																const imageUrl = await res.data.data.url
																const editor = editorData.replace(
																	`<img[^>]+>`,
																	`<img src="${imageUrl}"/>`
																)
																setEditorData(editor)
																// return respone?.data?.location;
																return {
																	defaullt: `${BASE_URL}files/${res.data.name}`,
																}
															}
														},
													}
												}
										}}
									/>
								) : (
									" ckeditor is  laoding..."
								)}

								<div className='flex justify-end '>
									<button
										type='submit'
										disabled={isSubmitting}
										className='rounded-main px-5 max-sm:px-2 p-2.5 bg-black text-white   mt-5'
									>
										Post Now
									</button>
								</div>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	)
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
	const [preview, setPreview] = useState(null)
	// for reset imageds
	useEffect(() => {
		if (isSubmitting) {
			setPreview(null)
		}
	}, [isSubmitting])
	return (
		<div>
			<input
				type='file'
				onChange={(event) => {
					form.setFieldValue(field.name, event.currentTarget.files[0])
					setPreview(URL.createObjectURL(event.currentTarget.files[0]))
				}}
				// {...props} is use to pass all props from Formik Field component
				{...props}
			/>
			{preview && (
				<div className='avatar'>
					<div className='w-24 rounded-main mt-5'>
						<img
							src={preview}
							alt='dummy'
							width='100'
							height='100'
						/>
					</div>
				</div>
			)}
		</div>
	)
}
