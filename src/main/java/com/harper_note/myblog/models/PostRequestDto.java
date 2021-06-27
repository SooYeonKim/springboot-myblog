package com.harper_note.myblog.models;

import lombok.Getter;

@Getter
public class PostRequestDto {
    private String title;
    private String contents;
    private String writer;
}
