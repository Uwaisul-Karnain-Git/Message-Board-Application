import { useState, useEffect } from 'react';
import './App.css';
import Comment from './components/Comment';
//import { CommentsContext } from './context/CommentsContext';

function App() {
  const [comments, setComments] = useState(() => []);
  const [showComments, setShowComments] = useState(() => true);
  var comment = null;

  // Fetch Comments
  useEffect (() => {
    getComments();
  }, []);

  // Fetch initial comments from the mocked API
  const getComments = async () => {
    const response = await fetch('https://run.mocky.io/v3/be0609d3-6a1b-4597-8af1-101221ac99c9');
    const data = await response.json();

    setComments(data.data);
    //console.log(data.data);   // For Testing purposes
  };

  // Find the relevant comment in the nested structure  based on 'commentId' and return it
  let findDeep = function(data, commentId) {
    
    if(comment == null) {
      for(let e of data) {
        if(comment == null) {
          if(e.id == commentId) {
            comment = e;
          }
          else if(e.replies && e.replies.length > 0) {
            findDeep(e.replies, commentId);
          }
        }
      };
    }

    return comment;
  }

  // Add Reply Comment
  const addReply = async (cmt, replyComment) => {

    let commentId = cmt.id;
    let isMainComment = commentId.split('-').length === 2; // Main comment id format = 'comment-0001', Reply comment id format = 'comment-0001-001'

    //  Get the Comment object to be updated
    let originalMainCommentId = commentId.substr(0,12);
    let originalMainComment = comments.find(cmt => cmt.id === originalMainCommentId);
    let originalComment = (isMainComment || originalMainComment.replies == 0) 
                            ? originalMainComment : findDeep(originalMainComment.replies, commentId);

    // Append the newly added comment
    let newRepliesObj = [replyComment, ...originalComment.replies];

    // Update the Original comment ('replies' array of the Original comment) with new reply comment
    originalComment.replies = newRepliesObj;
    
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? originalComment : comment
    ));

    console.log('%cA Reply Comment added successfully!', 'color:green');  // To print a 'Green colored' Success message in Console
    console.log(comments);  // For Testing purposes
  };

  return (    
    // <CommentsContext.Consumer>
      <div className='App'>
        <div className='flex-md-column'>
          <h3 style={{color: 'MidnightBlue'}} className='mt-4 mb-5'>VoiceIQ - Technical Evaluation</h3>

          <div className='mb-3'>
            <h4 style={{textAlign: 'center'}}>Sample Post</h4>
            <img className='mx-auto' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJ40-vJADFtXprk0w_7APKD2_5PCwb-TEKQ&usqp=CAU' />
          </div>

          <div className='mb-3'>
            <span className='fs-5 mb-4' onClick={e => setShowComments(prevShowComments => !prevShowComments)}>
              <u>{comments.length} Comments</u>
            </span> 
          </div>
        </div>

        {showComments && <Comment comments={comments} addReply={addReply} />}
      </div>
    // </CommentsContext.Consumer>      
  );
}

export default App;

