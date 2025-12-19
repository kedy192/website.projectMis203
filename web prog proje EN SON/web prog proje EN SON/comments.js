var submitBtn = document.getElementById("submitComment");
var commentsContainer = document.getElementById("commentsContainer");
var commentsData = [];

window.onload = function () {
    var saved = localStorage.getItem("veganSiteComments");
    if (saved) {
        commentsData = JSON.parse(saved);
        for (var i = 0; i < commentsData.length; i++) {
            renderComment(commentsData[i], false);
        }
    }

    if (submitBtn) {
        submitBtn.onclick = function () {
            var nameInput = document.getElementById("username");
            var commentInput = document.getElementById("commentText");
            var imageInput = document.getElementById("imageUpload");

            var name = nameInput.value.trim();
            var comment = commentInput.value.trim();
            var imageFile = imageInput.files[0];

            if (!name || !comment) {
                alert("Please enter a name and a comment.");
                return;
            }

            if (imageFile) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var newComment = {
                        name: name,
                        text: comment,
                        imageData: e.target.result,
                        time: new Date().toISOString()
                    };
                    addCommentAndSave(newComment);
                };
                reader.readAsDataURL(imageFile);
            } else {
                var newComment2 = {
                    name: name,
                    text: comment,
                    imageData: null,
                    time: new Date().toISOString()
                };
                addCommentAndSave(newComment2);
            }

            nameInput.value = "";
            commentInput.value = "";
            imageInput.value = "";
        };
    }
};

function addCommentAndSave(commentObj) {
    commentsData.unshift(commentObj); 
    localStorage.setItem("veganSiteComments", JSON.stringify(commentsData));
    renderComment(commentObj, true);
}

function renderComment(commentObj, prepend) {
    var commentDiv = document.createElement("div");
    commentDiv.className = "single-comment";

    var date = new Date(commentObj.time);
    var dateStr = date.toLocaleString();

    var html = "";
    html += "<p><strong>" + commentObj.name + "</strong> ";
    html += "<span style='font-size:11px;color:#777;'>(" + dateStr + ")</span></p>";
    html += "<p>" + commentObj.text + "</p>";

    if (commentObj.imageData) {
        html += "<img src='" + commentObj.imageData + "' class='user-image'>";
    }

    html += "<hr>";

    commentDiv.innerHTML = html;

    if (prepend) {
        commentsContainer.insertBefore(commentDiv, commentsContainer.firstChild);
    } else {
        commentsContainer.appendChild(commentDiv);
    }
}