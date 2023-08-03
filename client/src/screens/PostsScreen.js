/** @format */

import { useEffect, useState } from 'react';
import { Button, Card, List } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostsScreen = () => {
	const [posts, setPosts] = useState([]); // Để lưu dữ liệu
	const [isLoading, setIsLoading] = useState(false);

	// Hàm để lấy dữ liệu
	useEffect(() => {
		getAllPosts();
	}, []);
	const getAllPosts = async () => {
		setIsLoading(true);
		const api = 'http://localhost:3001/api/v1/posts';

		try {
			const res = await axios.get(api);

			if (res && res.status === 200 && res.data) {
				setPosts(res.data.data);
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	return (
		<div className='container mt-4'>
			<Card
				extra={
					<Link to={`/add-new`}>
						<Button type='primary'>Add New</Button>
					</Link>
				}>
				<h2>Posts</h2>
				<List
					itemLayout='vertical'
					pagination={[{ position: 'center' }]}
					dataSource={posts}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								title={
									<Link to={`/post-detail?id=${item.id}`}>{item.title}</Link>
								}
								description={item.body}
							/>
							{/* <a>{item.userId}</a> */}
						</List.Item>
					)}
				/>
			</Card>
		</div>
	);
};

export default PostsScreen;
