import { Link } from "react-router-dom"
import { Heading, SubHeading, InputBox, Button } from "../components/components";
import { useState } from "react";
import { USER_URL } from "../config";
import axios from "axios";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div className="flex h-screen w-screen bg-slate-200 justify-center items-center">
        <div className="bg-white h-auto w-80 border-4 rounded-2xl">
            <div className="m-8">
                <div className="flex justify-center">
                    <Heading text="Sign In"/>
                </div>
                <div className="flex justify-center text-center">
                    <SubHeading text="Enter your credentials to enter your account"/>
                </div>
                <div>
                    <InputBox onChange={(e) => { setUsername(e.target.value); }} title="Email" placeholder="example@email.com" />
                    <InputBox onChange={(e) => { setPassword(e.target.value); }} title="Password" placeholder="123456" />
                </div>
                <div className="flex justify-center">
                    <Button onClick={(e) => {
                        axios.post(`${USER_URL}/signin`, {
                            username,
                            password
                        })
                        .then((response) => {
                            localStorage.setItem("token", `Bearer ${response.data.id}`)
                        })
                     }} text="Sign in" />
                </div>
                <div className="flex justify-center">
                <SubHeading text="Don't have an account? "/>
                <Link className="pl-1 underline">
                    <SubHeading text="Sign up" />
                </Link>
                </div>
            </div>
        </div>
    </div>
}

