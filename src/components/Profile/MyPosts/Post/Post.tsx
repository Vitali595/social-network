import React from 'react';
import s from './Post.module.css';

type PostPropsType = {
    message: string
    likesCount: number
}

const Post = (props: PostPropsType) => {
  return (
    <div className={s.item}>
      <img src='https://pbs.twimg.com/profile_images/913636623300141056/58jmo4Ok.jpg' />
        { props.message }
          <div>
        <span>like</span> { props.likesCount }
      </div>
    </div>
  )
}

export default Post;