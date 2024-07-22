import { Link } from "react-router-dom"


export const Landing = () => {
    return <div>
        <div className="bg-slate-200 h-screen w-screen flex justify-center items-center">
            <div className=" grid h-3/4 w-5/6 grid-cols-2">
                <PageCard name="Sign Up" link={"/signup"}/>
                <PageCard name="Sign In" link={"/signin"}/>
                <PageCard name="Dashboard" link={"/dashboard"}/>
                <PageCard name="Send Money" link={"/send"}/>
            </div>
        </div>
    </div>
}

const PageCard = ({name, link}) => {
    return <div className="m-7">
        <Link to={link}>
                <div className=" p-6 p-2  bg-orange-200 h-full w-full rounded-xl text-lime-600">
                <div className="flex justify-center items-center h-full w-full flex text-5xl font-bold">
                    {name}
                </div>
            </div>
        </Link>
    </div>
}