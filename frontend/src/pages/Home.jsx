import React, { useEffect, useState } from 'react'
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
    const [toDos, setToDos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5555/todolist")
            .then((response) => {
                setToDos(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">ToDo List</h1>
                <Link to="/todolist/create">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <table className="w-full border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th className="border border-slate-600 rounded-md">No</th>
                            <th className="border border-slate-600 rounded-md">Task Name</th>
                            <th className="border border-slate-600 rounded-md">Edit</th>
                            <th className="border border-slate-600 rounded-md">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {toDos.map((toDo, index) => (
                            <tr key={toDo._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {toDo.taskName}
                                </td>

                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/todolist/edit/${toDo._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                                        </Link>
                                    </div>
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/todolist/delete/${toDo._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600' />
                                        </Link>
                                    </div>
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Home