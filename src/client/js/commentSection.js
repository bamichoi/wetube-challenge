import regeneratorRuntime from "regenerator-runtime";

const videoPlayer = document.getElementById("videoPlayer")
const form = document.getElementById("commentForm");
const deleteBtns =  document.getElementsByClassName("fa-times-circle")

const handleDelete = async (e) => {
    const deleteBtn = e.target
    const commentId =  deleteBtn.dataset.id;
    const commentLi = document.getElementById(`${commentId}`)
    await fetch(`/api/videos/comment/${commentId}`, {
        method : "DELETE"
    })
    commentLi.hidden = true;

}


const addComment = (text, id, writer) => {
    const videoComments = document.querySelector("#commentContainer ul");
    const newComment = document.createElement("li");
    const commentWriter = document.createElement("div");
    const writerSpan = document.createElement("span");
    commentWriter.appendChild(writerSpan);
    commentWriter.className = "comment_writer";
    commentWriter.innerText = `${writer}`
    newComment.appendChild(commentWriter);
    const commentText = document.createElement("div");
    const commentTextDiv = document.createElement("div");
    const commentTextSpan = document.createElement("span");
    commentTextSpan.innerText = `${text}`;
    commentTextDiv.appendChild(commentTextSpan);
    commentText.appendChild(commentTextDiv);
    const commentDelete = document.createElement("div");
    commentDelete.className = "comment_delete";
    const deleteIco = document.createElement("i");
    deleteIco.className = "fas fa-times-circle";
    deleteIco.dataset.id  = id;
    deleteIco.addEventListener("click", handleDelete);
    commentDelete.appendChild(deleteIco);
    commentText.appendChild(commentDelete);
    commentText.className = "comment_text";
    newComment.id = id;
    newComment.appendChild(commentText);
    videoComments.prepend(newComment);
}

const handleSubmit = async (event) => {
    const textarea = form.querySelector("textarea");
    event.preventDefault();
    const text = textarea.value;
    const videoId = videoPlayer.dataset.id;
    if (text === "") {
        return 
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers : {
            "Content-Type":"application/json"
        },
        body:  JSON.stringify({
           text,
        })
    });
    textarea.value="";
    
    if (response.status === 201) {
        const { newCommentId, writer } = await response.json();
        addComment(text, newCommentId, writer);
    }
}





if (form) {
    form.addEventListener("submit", handleSubmit);
}


for (const deleteBtn of deleteBtns) {
    deleteBtn.addEventListener("click", handleDelete);
}
