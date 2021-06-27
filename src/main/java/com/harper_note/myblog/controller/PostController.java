package com.harper_note.myblog.controller;

import com.harper_note.myblog.models.Post;
import com.harper_note.myblog.models.PostRepository;
import com.harper_note.myblog.models.PostRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostRepository postRepository;

    @GetMapping("/api/posts")
    public List<Post> getPosts() {
        return postRepository.findAllByCreatedAtDesc();
    }

    @GetMapping("/api/posts/{id}")
    public Post getPostDetail(@PathVariable Long id) {
        return postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다.")
        );
    }

    @PostMapping("/api/posts")
    public Post createPost(@RequestBody PostRequestDto requestDto) {
        Post post = new Post(requestDto);
        return postRepository.save(post);
    }
}
