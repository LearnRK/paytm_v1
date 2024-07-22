import { Link } from "react-router-dom"
import { Heading, SubHeading, InputBox, Button } from "../components/components";
import { useState } from "react";
import axios from "axios";
import {USER_URL} from "../config"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    return <div className="flex h-screen w-screen bg-slate-200 justify-center items-center">
        <div className="bg-white h-auto w-80 border-4  rounded-2xl">
            <div className="m-8">
                <div className="flex justify-center">
                    <Heading text="Sign Up"/>
                </div>
                <div className="flex justify-center text-center">
                    <SubHeading text="Enter your information to create an account"/>
                </div>
                <div>
                    <InputBox onChange={(e) => { setFirstName(e.target.value); }} title="First Name" placeholder="Alice" />
                    <InputBox onChange={(e) => { setLastName(e.target.value); }} title="Lase Name" placeholder="Alexa" />
                    <InputBox onChange={(e) => { setUserName(e.target.value); }} title="Email" placeholder="alice@email.com" />
                    <InputBox onChange={(e) => { setPassword(e.target.value); }} title="Password" placeholder="123456" />
                </div>
                <div className="flex justify-center">
                    <Button onClick={async () => {
                        // axios.get(`${USER_URL}`)
                        const response = await axios.post(`${USER_URL}/signup`, {
                            username,
                            password,
                            firstName,
                            lastName
                        })
                        localStorage.setItem("token",`Bearer ${response.data.id}`)
                    }}  text="Sign up" />
                </div>
                <div className="flex justify-center">
                <SubHeading text="Already have account? "/>
                <Link className="pl-1 underline">
                    <SubHeading text="Login" />
                </Link>
                </div>
            </div>
        </div>
    </div>
}

