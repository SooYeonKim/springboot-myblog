$(document).ready(function() {
    let id = document.location.href.split("?id=")[1];
    getDetailPost(id);
})

function getDetailPost(id) {
    $.ajax({
        type: 'GET',
        url: `/api/posts/${id}`,
        success: function(response) {
            $('#see-area').empty();
            let tempHtml = addDetailPostItem(response);
            $('#see-area').append(tempHtml);
        }
    })
}

function addDetailPostItem(post) {
    return `<div id="detail-container">
                <div class="card w-100">
                    <div class="card-body">
                        <div class="card border-light mb-3">
                            <div class="card-header detail-header">
                                <div>${post.writer}</div>
                                <div>${post.createdAt}</div>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text">${post.contents}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail-button-box">
                    <a type="button" class="btn btn-secondary" href="/">목록</a>
                </div>
            </div>`
}