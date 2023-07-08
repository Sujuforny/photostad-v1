import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice"
import tutorialSlice from "@/redux/features/tutorial/tutorialSlice";
import userSlice from "@/redux/features/users/userSlice";
import imagesSlice from "@/redux/features/images/imagesSlice";
import certificateSlice from "@/redux/features/certificate/certificateSlice";
import uploadSlice from "@/redux/features/file/uploadSlice";
import requestTutorialSlice from "@/redux/features/requestTutorial/requestTutorialSlice";
import unReadTutorialSlice from "@/redux/features/tutorial/reqTutorial/unReadTutorialSlice";
import roleReducer from "./features/role/roleSlice"
import imageSlice from "./features/image/imageSlice";

const store = configureStore({
    reducer: {
        // reducerPath is the name of the slice default is "api"
        [apiSlice.reducerPath]: apiSlice.reducer,
        
        auth : authReducer,
        roles: roleReducer,
        image: imageSlice,

        
        tutorials: tutorialSlice,
		users: userSlice,
		certificates: certificateSlice,
		upload: uploadSlice,
		requestTutorials: requestTutorialSlice,
		unreadRequest: unReadTutorialSlice,
    },
    // this need for rtks query to work with cache and other stuff
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
    // devTools must set to false in production
    devTools: true,
});

export default store;