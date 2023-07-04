import { configureStore } from "@reduxjs/toolkit"
import tutorialSlice from "./features/tutorial/tutorialSlice"
import userSlice from "./features/users/userSlice"
import roleSlice from "./features/role/roleSlice"
import imagesSlice from "./features/images/imagesSlice"
import certificateSlice from "./features/certificate/certificateSlice"
import uploadSlice from "./features/file/uploadSlice"
import requestTutorialSlice from "./features/requestTutorial/requestTutorialSlice"
import unReadTutorialSlice from "./features/tutorial/reqTutorial/unReadTutorialSlice"


export const store = configureStore({
	reducer: {
		tutorials: tutorialSlice,
		users: userSlice,
		roles: roleSlice,
		images: imagesSlice,
		certificates: certificateSlice,
		upload: uploadSlice,
		requestTutorials: requestTutorialSlice,
		unreadRequest: unReadTutorialSlice,
		// emailUsers: emailUserSlice,

	},
})
