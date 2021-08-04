import {
    addPostActionCreator,
    deletePost,
    InitialStateType,
    PostType, profileReducer,
    ProfileType
} from "./profile-reducer";

let state: InitialStateType

beforeEach(() => {
    state = {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 11},
            {id: 3, message: 'Blabla', likesCount: 11},
            {id: 4, message: 'Dada', likesCount: 11}
        ] as Array<PostType>,
        profile: {} as ProfileType,
        status: ""
    }
})

test("length of posts should be incremented", () => {
    const action = addPostActionCreator("it-incubator")

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(5)
})

test("message of new posts should be correct", () => {
    const action = addPostActionCreator("it-incubator")

    const newState = profileReducer(state, action)

    expect(newState.posts[4].message).toBe("it-incubator")
})

test("after deleting length of messages should be decrement", () => {
    const action = deletePost(1)

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
})

test("after deleting length shouldn't be decrement if id is incorrect", () => {
    const action = deletePost(1000)

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(4)
})