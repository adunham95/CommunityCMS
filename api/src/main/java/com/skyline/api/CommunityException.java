package com.skyline.api;

public class CommunityException extends RuntimeException {
    String message;
    private Long resourceId;

    public CommunityException(String message){
        super(message);
        this.message = message;
    }


}
