import axios from "axios";
import { useEffect, useState } from "react";
import { Spin, Card, Button } from 'antd';
import { Link } from "react-router-dom";

const PostDetail = () => {

    const [postDetail, setPostDetail] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const postId = 1;

    useEffect(() => {
        getPostDetail();
    }, [postId]);

    const getPostDetail = async () => {
        const api = `http://localhost:3001/api/v1/posts/post-detail?id=${postId}`;
        setIsLoading(true)
        try {
            const res = await axios.get(api);

            if (res && res.status === 200 && res.data) {
                setPostDetail(res.data);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
        }
    }
    return (
        <div>
            {isLoading ? <Spin /> : postDetail ?
                <Card extra={
                    <Link to={`/edit-post`}>
                        <Button type="primary">Edit post</Button>
                    </Link>
                }>
                    <h1>{postDetail.title}</h1>
                    <p>{postDetail.body}</p>
                </Card>
                :
                <p>Post not found</p>
            }
        </div>
    )
}

export default PostDetail;