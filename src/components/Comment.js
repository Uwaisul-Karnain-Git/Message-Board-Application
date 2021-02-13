import { useState } from 'react';
import AddComment from './AddComment';
//import { CommentsProvider } from '../context/CommentsContext';

const Comment = ({ comments, addReply }) => {
    //const [comments, setComments] = useContext(CommentsProvider);
    const [showCommentTextarea, setShowCommentTextarea] = useState(false);
    const [commentId, setCommentId] = useState(false);

    return (
        <>
            {comments.map(cmt => (
                <div key={cmt.id} style={{textAlign: 'left'}}>
                    <div>
                        <div className='p-3 comments-div'>
                            <p className='fs-6 text-muted'><span className='comment-id'>{cmt.id}</span></p> 
                            <p className='fs-5 text-wrap'>
                                <span className='comment-user-blue'>{cmt.user.name}: </span> 
                                <span>{cmt.comment}</span>
                            </p>
                            {/* <p className='fs-5 text-wrap'>
                                <span className='comment-user-blue'>{cmt.user.name}: </span> 
                                <span>{cmt.comment}</span>
                            </p> */}

                            <button onClick={() => { setShowCommentTextarea(true); setCommentId(cmt.id); 
                                cmt.replies.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));}} className="btn">Reply
                            </button>
                        </div>                       

                        {/* Conditionally rendering the '<AddComment />'' component */}
                        {showCommentTextarea && commentId == cmt.id &&                        
                        <AddComment 
                            comment={cmt} 
                            addReply={addReply} 
                            setShowCommentTextarea={setShowCommentTextarea} />  
                        }                                        
                    </div>

                    <Comment comments={cmt.replies} addReply={addReply} />

                </div>
            ))}
        </>
    )
}

export default Comment;
