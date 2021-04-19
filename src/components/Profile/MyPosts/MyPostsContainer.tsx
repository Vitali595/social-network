import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {StoreType} from "../../../redux/store";
import StoreContext from '../../../StoreContext';
import MyPosts from "./MyPosts";

type MyPostsContainerPropsType = {
    store: StoreType
}

const MyPostsContainer = () => {

    return (
        <StoreContext.Consumer>
            {(store) => {

                let state = store.getState()

                let addPost = () => {
                    store.dispatch(addPostActionCreator())
                }

                let onPostChange = (text: string) => {
                    if (text) {
                        let action = updateNewPostTextActionCreator(text)
                        store.dispatch(action)
                    }
                }

                return <MyPosts
                    posts={state.profilePage.posts}
                    newPostText={state.profilePage.newPostText}
                    updateNewPostText={onPostChange}
                    addPost={addPost}/>
            }
        }
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer;