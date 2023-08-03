import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

function EditPost() {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");
    const [postDetail, setPostDetail] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const formRef = useRef();

    useEffect(() => {
        getPostDetail();
    }, [postId]);
    const getPostDetail = async () => {
        const api = `http://localhost:3001/api/v1/posts/post-detail?id=${postId}`;
        setIsLoading(true);
        try {
            const res = await axios(api);
            if (res && res.status === 200 && res.data) {
                setPostDetail(res.data);
                formRef.current.setFieldsValue({
                    title: res.data.title,
                    body: res.data.body,
                });
                setIsLoading(false);
            } else {
                setIsLoading(false);
                console.log("Post not found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditPost = (values) => {
        let config = {
            method: "put",
            maxBodyLength: Infinity,
            url: `http://localhost:3001/api/v1/posts?id=${postDetail.id}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: values,
        };
        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setIsSubmitted(true);
            })
            .catch((error) => {
                console.log(error);
            });
        formRef.current.resetFields();
    };

    return (
        <div className="container mt-4">
            <Card
                title="Edit Post"
                extra={
                    isSubmitted && (
                        <div className="alert alert-success alert-dismissible">
                            Post has been submitted successfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )
                }
            >
                <Form
                    layout="vertical"
                    size="large"
                    ref={formRef}
                    onFinish={handleEditPost}
                >
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Please fill in the title",
                            },
                        ]}
                        name={"title"}
                        label="Title"
                    >
                        {postDetail && (
                            <Input placeholder="Title" max={150} showCount allowClear />
                        )}
                    </Form.Item>
                    <Form.Item name={"body"} label="Noi dung">
                        <Input.TextArea placeholder="Noi dung" />
                    </Form.Item>
                </Form>
                <div className="text-right">
                    <Button type="primary" onClick={() => formRef.current.submit()}>
                        Submit
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default EditPost;