import { configureStore } from "@reduxjs/toolkit";
import Userslice from "./slices/Userslice";
import PostSlice from "./slices/PostSlice";
import PostUser from "./slices/PostUser";

const store= configureStore({
    reducer:{
        user: Userslice,
        post: PostSlice,
        postUser:PostUser,
    }
})

export default store;