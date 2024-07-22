import { useEffect, useState } from "react"
import { Avatar, Button, Heading, InputBox } from "../components/components"
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { ACCOUNT_URL } from "../config";


export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    useEffect(()=>{
        
    },[])
    return <div>
        <div className="bg-slate-200 h-screen w-screen flex justify-center items-center">
            <div className=" p-6 p-2  bg-white h-auto w-2/6 rounded-xl">
                <div className="m-4 flex justify-center"><Heading text="Send Money" /></div>
                <div className="flex p-2">
                    <Avatar name={name} type="green" />
                    <div className="ml-3">
                        <TransferToName name={name}/>
                    </div>
                </div>
                <div className="ml-2 p-2">
                    <InputBox onChange={(e) => {  setAmount(e.target.value)  }}  title="Amount in $" placeholder="Enter Ammount"/>
                </div>
                <div className="">
                    <Button text="Initiate Transfer" type="green"  onClick={() => {
                        axios.post(`${ACCOUNT_URL}/transfer`, {
                            to: id,
                            amount: parseInt(amount)
                        },{
                            headers: {  Authorization: `${localStorage.getItem("token")}` }
                        })
                        .then(response => {
                            const success = (response.status === 200 ? true: false);
                            success? alert("Transaction Successful"): alert("Transaction failed")
                        })
                        .catch((e) => {
                             alert("Transaction failed");
                        })
                    }}  />
                </div>

            </div>

        </div>
    </div>
}

const TransferToName = ({name}) => {
    return  <div className="text-xl font-bold">
        {name}
    </div>
}