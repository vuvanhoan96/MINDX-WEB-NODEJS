import { Button } from "antd";
import React from "react";

const HomeScreen = () => {

    return (
        <>
            <h1>HomeScreen</h1>
            <Button onClick={() => localStorage.clear()}>Log out</Button>
        </>
    )
}

export default HomeScreen;