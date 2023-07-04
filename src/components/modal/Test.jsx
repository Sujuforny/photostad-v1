"use client"
import axios from "axios"
import { Button, Modal } from "flowbite-react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import * as Yup from "yup"

const validationSchema = Yup.object({
	description: Yup.string().required("កាក​​ មិនអាចទទេបានទេ"),
	name: Yup.string().required("កាក​​ មិនអាចទទេបានទេ"),

	// Yub.mixed() for upload file with diferent type format
	file: Yup.mixed()
		.test("fileSize", " File ធំជាង 5MB", (value) => {
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
	"application/pdf",
]

export default function Test({ closeModal }) {
	const [isLoading, setIsLoading] = useState(false)
	// end of formik section
	const editorRef = React.useRef()
	const [editorLoaded, setEditorLoaded] = React.useState(false)
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

	// for submit to server
	const createNewUser = async (tutorial) => {
		const { name, description } = tutorial

		let myHeaders = new Headers()
		myHeaders.append("Content-Type", "application/json")

		let raw = JSON.stringify({
			name,
			thumbnail: "5",
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

		fetch("http://136.228.158.126:8002/api/v1/tutorials", requestOptions)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error))
	}
	// end of submit to server

	// upload file
	const uploadImage = async (values) => {
		setIsLoading(true)
		try {
			const response = await axios.post(
				`http://136.228.158.126:8002/api/v1/files`,
				values.file
			)
			console.log(response)
			alert("Image uploaded successfully")

			return (
				response.data.location ||
				"https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
			)
		} catch (error) {
			console.log(error)
		}
	}
    // flow bite
    const [openModal, setOpenModal] = useState(undefined)
    const [modalPlacement, setModalPlacement] = useState('center')
    const props = { modalPlacement, openModal, setModalPlacement, setOpenModal };

	return (
        <Modal
        show={props.openModal === 'placement'}
        position={props.modalPlacement}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Small modal</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 p-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
              companies around the world are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to
              ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as
              possible of high-risk data breaches that could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>I accept</Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
	)
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
					<div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
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

{
	/* <dialog id="my_modal_4" className="modal">
<form method="dialog" className="modal-box w-11/12 max-w-5xl">
<div className="modal-action">

    <button className="btn">Close</button>
  </div>
  <h3 className="font-bold text-lg">Hello!</h3>
  <p className="py-4">Click the button below to close</p>
 
  <button type="submit" className="btn btn-outline"> test</button>
</form>
</dialog> */
}
