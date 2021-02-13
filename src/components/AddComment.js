import { useState } from 'react';

const AddComment = ({ comment, addReply, setShowCommentTextarea }) => {
    // 'Component level state' used with 'Controlled Components'
    const [text, setText] = useState('');

    // Hard-code the Current Logged in User
    const currentUser = {
        "id": "user-0015",
        "name": "Karnain"
    };

    const addReplyHandle = () => {

        var newCommentId = setNewCommentId(comment);

        // Create new 'Comment' object
        addReply(comment, { 
            id: newCommentId,
            user: currentUser,
            comment: text,
            replies: []
        });

        // Clear data
        setText('');
        setShowCommentTextarea(false);
    };

    const setNewCommentId = comment => {
        let commentId = comment.id;

        // Generate next comment id
        if(comment.replies && comment.replies.length > 0) {
            // Sort all the comments by Id (since I'm changing the order of the comments when inserting new ones)
            comment.replies.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
            let highestCommentId = comment.replies[comment.replies.length - 1].id;
            
            // Here, I have used '+' in order to convert the string into a number prior to add 1 => This works the sameway as 'parseInt()' 
            let nextId = (+(highestCommentId.split('-')[highestCommentId.split('-').length - 1]) + 1).toString();
            // Make it a 3 digits number
            if(nextId.length == 1)
                nextId = '00' + nextId;
            else if(nextId.length == 2)
                nextId = '0' + nextId;

            commentId = highestCommentId.substr(0, highestCommentId.length - 3) + nextId;
        }
        else {
            // If this is the first reply, add '001'
            commentId = commentId + '-001';
        }

        return commentId;
    };

    return (
        <div className='p-3'>
            <p className='comment-user-regular'><span>Comment as </span> <span className='comment-user-blue'>{currentUser.name}</span></p>
            <textarea value={text} onChange={e => setText(e.target.value)} className='mb-2 comment-text-area' 
                placeholder="What are your thoughts?" />
            <br />

            <div className='d-flex btn-panel'>
                {/* Dynamically binding the CSS class based on enable / disable state of the 'Reply' button */}
                <button onClick={addReplyHandle} disabled={!text} className={text ? ' btn-reply-active': 'btn-reply'}>Reply</button> 
                <button onClick={e => {setShowCommentTextarea(false)}} className='btn-cancel'>Cancel</button>
            </div>
        </div>
    )
}

export default AddComment;
