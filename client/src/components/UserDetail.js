import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Spin } from "antd";

const UserDetail = () => {

    const [userDetail, setUserDetail] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');


    useEffect(() => {
        getUserdetailByid();
    }, [userId]);
    const getUserdetailByid = async () => {
        const api = `http://localhost:3001/api/v1/users/users-detail?id=${userId}`;
        setIsLoading(true);

        try {
            const res = await axios({
                method: 'get',
                url: api,
                headers: {
                    'Content-Type': "application/json"
                }
            });
            if(res && res.status === 200 && res.data){
                setUserDetail(res.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }
    return (
        <div>
            {
                isLoading ? (<Spin />) : userDetail?(
                    <Card>
                        <h1>{userDetail.name}</h1>
                        <p>{userDetail.address.street} {userDetail.address.suite} {userDetail.address.city}</p>
                        <h6>{userDetail.phone}</h6>
                        <h6>{userDetail.website}</h6>
                    </Card>
                ): (
                    <p>User not found!</p>
                )
            }
        </div>
    )
}

export default UserDetail;