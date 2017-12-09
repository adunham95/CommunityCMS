package com.skyline.api;

public class ErrorResponse{
    public String msg;
    public Boolean success;
    public int errorCode;


    public ErrorResponse(){}

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }
}
