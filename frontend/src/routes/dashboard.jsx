import { useEffect, useState } from "react"
import { Appbar, BalanceBar, UserFilter, UserEntry } from "../components/components"
import { ACCOUNT_URL, USER_URL } from "../config";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const [ users, setUsers] = useState([]);
    const [ filter, setfilter] = useState("");
    const [ balance, setBalance ] = useState();

    const navigate = useNavigate();


    // add debouncing here
    useEffect(() => {
        axios.get(`${USER_URL}/bulk?filter=${filter}`, {
            headers: {  Authorization: `${localStorage.getItem("token")}`  }
        })
        .then(response => {
            console.log(response);
            setUsers(response.data.users);
        })
    },[filter]);

    useEffect(() => {
        axios.get(`${ACCOUNT_URL}/balance`, {
            headers: {  Authorization: `${localStorage.getItem("token")}` }
        })
        .then(response => {
            console.log(balance);
            setBalance(response.data.balance);
        })
    } , [balance]);

    return <div>
        <div className="">
            <div className="bg-slate-200 flex h-screen w-screen justify-center items-center">
                <div className="bg-white pb-4 m-24 h-auto w-11/12">
                    <div className=" flex">
                        <Appbar title="Payments App" name="User"/>
                    </div>
                    <div className=" flex">
                        <BalanceBar balance = {balance} />
                    </div> 
                    <div className=" flex">
                        <UserFilter input = "Jack" onChange={(e) => { setfilter(e.target.value) }} />
                    </div>
                    <div className="flex">
                        <div className="w-full mr-7">
                            { users.map(user => <UserEntry name={user.firstName} onClick={(e) => {
                                navigate("/send?id=" + user._id + "&name=" + user.firstName);
                            }}/> )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

