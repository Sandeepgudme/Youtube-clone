import React, { useEffect, useState } from "react"; 
import API from "../api/api"; 
 
const CommentSection = ({ videoId }) => { 
  const [comments, setComments] = useState([]); // store all comments
  const [text, setText] = useState(""); // new comment input
  const [editingId, setEditingId] = useState(null); // track editing comment
  const [editText, setEditText] = useState(""); // edit input text
 
  const user = JSON.parse(localStorage.getItem("user")); // get logged-in user
 
  // FETCH COMMENTS 
  const fetchComments = async () => { 
    try { 
      const res = await API.get(`/comments/${videoId}`); // get comments for video
      setComments(res.data); 
    } catch (err) { 
      console.error(err); 
    } 
  }; 
 
  useEffect(() => { 
    fetchComments(); // fetch when videoId changes
  }, [videoId]); 
 
  // ADD COMMENT 
  const handleComment = async () => { 
    if (!text.trim()) return; // prevent empty comment
 
    try { 
      await API.post("/comments", { 
        text, 
        user: user?.username || "Guest", // fallback user
        videoId, 
      }); 
 
      setText(""); 
      fetchComments(); // refresh list
    } catch (err) { 
      console.error(err); 
    } 
  }; 
 
  // DELETE COMMENT 
  const handleDelete = async (id) => { 
    try { 
      await API.delete(`/comments/${id}?user=${user?.username}`); // delete by id
 
      setComments(comments.filter((c) => c._id !== id)); // update UI
    } catch (err) { 
      console.error(err); 
      alert("Delete failed"); 
    } 
  }; 
 
  // START EDIT 
  const handleEditClick = (comment) => { 
    setEditingId(comment._id); // set editing comment id
    setEditText(comment.text); // preload text
  }; 
 
  // SAVE EDIT 
  const handleSaveEdit = async (id) => { 
    try { 
      const res = await API.put( 
        `/comments/${id}?user=${user?.username}`, 
        { text: editText } // send updated text
      ); 
 
      setComments( 
        comments.map((c) => 
          c._id === id ? res.data : c // update edited comment
        ) 
      ); 
 
      setEditingId(null); // exit edit mode
    } catch (err) { 
      console.error(err); 
      alert("Update failed"); 
    } 
  }; 
 
  return ( 
    <div className="mt-4"> 
 
      <h3 className="text-lg font-semibold mb-2"> 
        Comments 
      </h3> 
 
      {/* INPUT */} 
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} // update input
        placeholder="Add comment" 
        className="w-full bg-gray-900 p-2 rounded" 
      /> 
 
      <button 
        onClick={handleComment} // add comment
        className="bg-blue-600 px-4 py-1 mt-2 rounded" 
      > 
        Comment 
      </button> 
 
      {/* LIST */} 
      <div className="mt-4 space-y-3"> 
 
        {comments.map((c) => ( // render each comment
          <div 
            key={c._id} 
            className="bg-gray-900 p-3 rounded" 
          > 
 
            {editingId === c._id ? ( // edit mode
              <> 
                <input 
                  value={editText} 
                  onChange={(e) => setEditText(e.target.value)} 
                  className="w-full p-1 bg-black border mb-2" 
                /> 
 
                <button 
                  onClick={() => handleSaveEdit(c._id)} // save edit
                  className="bg-green-600 px-2 py-1 rounded mr-2" 
                > 
                  Save 
                </button> 
              </> 
            ) : ( 
              <> 
                <p> 
                  <b>{c.user}</b>: {c.text} 
                </p> 
 
                {/* OWNER ONLY ACTIONS */} 
                {c.user === user?.username && ( // show only for owner
                  <div className="flex gap-2 mt-2"> 
                    <button 
                      onClick={() => handleEditClick(c)} // start edit
                      className="bg-gray-700 px-2 py-1 rounded text-sm" 
                    > 
                      Edit 
                    </button> 
 
                    <button 
                      onClick={() => handleDelete(c._id)} // delete comment
                      className="bg-red-600 px-2 py-1 rounded text-sm" 
                    > 
                      Delete 
                    </button> 
                  </div> 
                )} 
              </> 
            )} 
          </div> 
        ))} 
 
      </div> 
    </div> 
  ); 
}; 
 
export default CommentSection; // export component