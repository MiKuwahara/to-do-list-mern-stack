import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton.jsx";
import Spinner from "../components/Spinner.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditToDo = () => {
    const [toDo, setToDo] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/todolist/${id}`)
            .then((response) => {
                setToDo(response.data.taskName);
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                alert("An error happened. Pease check console.");
                console.log(error);
            });
    }, []);

    const handleEditToDo = () => {
        const data = {
            taskName: toDo,
        };

        setLoading(true);
        axios
            .put(`http://localhost:5555/todolist/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Task edited successfully', { variant: 'success' });
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                //alert('An error happened. Please Chack console');
                enqueueSnackbar('Error', { variant: 'error' });
                console.log(error);
            });
    };


    return (
        <div className="p-4">
            <BackButton />
            <h1 class="text-3xl my-4">Edit ToDo</h1>
            {loading ? <Spinner /> : ""}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Task Name</label>
                    <input
                        type="text"
                        value={toDo}
                        onChange={(e) => setToDo(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditToDo}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditToDo