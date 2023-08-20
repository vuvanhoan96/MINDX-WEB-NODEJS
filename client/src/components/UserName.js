import axios from "axios";
import { useEffect, useState } from "react";


const UserName = ({ uuid }) => {

    const [userDetail, setUserDetail] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        { uuid && getUserbyId() }
    }, [uuid]);
    const getUserbyId = async () => {

        const api = `http://localhost:3001/api/v1/users/users-detail?id=${uuid}`;
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

            if (res && res.status === 200 && res.data) {
                setUserDetail(res.data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                console.log("User not found");
            }
        } catch (error) {
            setIsLoading(false);
        }
    }
    return userDetail ? <p>{userDetail.username}</p> : (
        <div>
            {uuid}
        </div>
    )
}

export default UserName;