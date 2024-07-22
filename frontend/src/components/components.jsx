
export const Heading =({text}) =>{
    return <div className="text-3xl text-black font-bold ">{text}</div>
}

export const SubHeading =({text}) =>{
    return <div className="text-md text-black font-slate-400 ">{text}</div>
}

export const InputBox = ({title, placeholder, onChange}) => {
    return <div className="">
        <div className="text-md text-black font-semibold">{title}</div>
        <input onChange={onChange} className="w-full h-auto p-1 mt-1 mb-2" type="text" placeholder={placeholder} />
    </div>
}

export const Button = ({text, type="black", onClick}) => {
    return <button onClick={onClick} type="button" className={`text-white ${type === "green" ? "bg-green-500" : "bg-gray-800"}  w-full hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`} >{text}</button>;
}

export const Appbar = ({title, name}) => {
    return <div className=" border-b-4 m-6 flex justify-between pb-3 h-min w-full border-slate-200">
        <div className="text-2xl font-bold ">
            {title}
        </div>
        <div className="flex">
            <div className="mr-3 font-bold text-md">
                Hello, {name}
            </div>
            <div className="">
                <Avatar name="Name" />
            </div>
        </div>
    </div>
}

export const BalanceBar = ({balance}) => {
    return <div className=" mt-2 m-6 mb-2 flex  pb-3 h-min w-full ">
        <div className="text-xl font-bold ">
            Your Balance : ${balance}
        </div>
    </div>
}

export const UserFilter = ({input, onChange}) => {
    return <div className=" ml-6 mt-2 mr-6 mb-3 pb-3 h-min w-full ">
        <div className="text-xl font-bold ">
            Users : ${input}
        </div>
        <input onChange={onChange} className=" mt-4 m-2 p-2 border-2 w-full rounded-md" type="text" placeholder="Search users..." />
    </div>
}

export const UserEntry = ({name, onClick}) => {
    return <div className="ml-6 mr-4 pl-2 p-1 flex justify-between items-center h-min w-full ">
        <div className="flex items-center">
            <Avatar name={name} />
            <div className="pl-4 font-bold">{name}</div>
        </div>
        <div className="flex items-center justify-center"> {/*items-center*/}
            <Button onClick={onClick} text="Send Money"/>
        </div>
    </div>
}
export const Avatar = ({name, type}) => {
    return <div>
        <div className={`w-8 ${type === "green" ? "bg-green-500 border-green-500 text-white " : "bg-slate-200 border-slate-200 text-black " }border-3xl border-4 rounded-3xl justify-center flex`}>{name[0]}</div>
    </div>
}
