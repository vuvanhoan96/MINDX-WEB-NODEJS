/** @format */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spin, Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import UserName from "../components/UserName"
const PostDetail = () => {
	const [postDetail, setPostDetail] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const params = new URLSearchParams(window.location.search);
	const postId = params.get('id');

	useEffect(() => {
		getPostDetail();
	}, [postId]);

	const getPostDetail = async () => {
		const api = `http://localhost:3001/api/v1/posts/post-detail?id=${postId}`;
		setIsLoading(true);
		try {
			const res = await axios({
				method: 'get',
				url: api,
				headers: {
					'apiKey': 'user1',
					'Content-Type': 'application/json'
				},
			});
			console.log(res);
			if (res && res.status === 200 && res.data) {
				setPostDetail(res.data);
				setIsLoading(false);
			}
		} catch (error) {
			setIsLoading(false);
		}
	};
	return (
		<div>
			{isLoading ? (
				<Spin />
			) : postDetail ? (
				<Card
					extra={
						<Link to={`/edit-post?id=${postDetail.id}`}>
							<Button type='primary'>Edit post</Button>
						</Link>
					}>
					<h1>{postDetail.title}</h1>
					<p>{postDetail.body}</p>
					<UserName uuid={postDetail.userId}/>
				</Card>
			) : (
				<p>Post not found</p>
			)}
		</div>
	);
};

export default PostDetail;
