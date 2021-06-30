$(document).ready(function() {
    $('#query').on('keypress', function (e) {
        if (e.key == 'Enter') {
            getSearchPosts();
        }
    });

    getPosts();
})

function getPosts() {
    $.ajax({
        type: 'GET',
        url: '/api/posts',
        success: function(response) {
            $('#post-container').empty();
            for(let i=0; i<response.length; i++) {
                let post = response[i];
                let tempHtml = addPostItem(post);
                $('#post-container').append(tempHtml);
            }
        }
    })
}

function getSearchPosts() {
    let search = $('#query').val();
    if(search == '') {
        alert("검색어를 입력해 주세요.");
        $('#query').focus();
        return
    }

    $.ajax({
        type: 'GET',
        url: `/api/posts?search=${search}`,
        success: function(response) {
            $('#post-container').empty();
            for(let i=0; i<response.length; i++) {
                let post = response[i];
                let tempHtml = addPostItem(post);
                $('#post-container').append(tempHtml);
            }
        }
    })
}

function addPostItem(post) {
    return `<div class="card w-100 cursor-pointer" onclick="goDetailPost(${post.id})">
                <div class="card-body">
                    <h2 class="post-title">
                        ${post.title}
                    </h2>
                    <div class="post-sub">
                        <p class="post-writer">
                            ${post.writer}
                        </p>
                        <p class="post-date">
                            ${post.createdAt}
                        </p>
                    </div>
                </div>
            </div>`
}

function writePost() {
    let title = $('#input-title').val();
    let writer = $('#input-writer').val();
    let contents = $('#input-contents').val();
    if(title == '') {
        alert("제목을 입력해 주세요.");
        return;
    }
    if(writer == '') {
        alert("작성자를 입력해 주세요.");
        return;
    }
    if(contents == '') {
        alert("내용을 입력해 주세요.");
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/api/posts',
        contentType: "application/json",
        data: JSON.stringify({title: title, writer: writer, contents: contents}),
        success: function(response) {
            alert("저장이 완료되었습니다.");
            window.location.replace("/");
        }
    })
}

function goDetailPost(id) {
    window.location.href = `detail.html?id=${id}`
}