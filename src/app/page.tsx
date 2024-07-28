"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/react";

import { useDispatch, useSelector } from 'react-redux';
import { handleGetTodoRequest } from '@/redux/actions-reducers/todo/todo';
import toast from 'react-hot-toast';
import NavbarComponent from '@/components/Navbar';
import AddEditTodoModal from '@/components/AddEditTodoModal';

const Home = () => {
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false)
    const [editTodoLoadingId, setEditTodoLoadingId] = useState("")
    const [deleteTodoLoadingId, setDeleteTodoLoadingId] = useState("")
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [load, setLoad] = useState(false)
    const [editTodo, setEditTodo] = useState<any>(null)
    const { isLoading, todoList, totalCount } = useSelector((state: any) => state.Todo)
    const [todoState, setTodoState] = useState({
        title: "",
        description: ""
    })

    const textTruncate = (text: string, number: number) => {
        if (text.length > number) {
            return text.slice(0, number) + '...'
        }
        return text
    }

    useEffect(() => {
        dispatch(handleGetTodoRequest({ currentPage: 1, perPage: 20 }))
    }, [flag])

    useEffect(() => {
        if (editTodo) {
            setTodoState({
                title: editTodo.title,
                description: editTodo.description
            })
        }
    }, [editTodo])

    const handleGetEditTodo = async (id: string) => {
        setLoad(true)
        setEditTodoLoadingId(id)
        const response = await fetch(`api/todo?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const jsonData = await response.json();
        if (jsonData.success === true) {
            setEditTodo(jsonData.data)
            setModalIsOpen(!modalIsOpen)
        } else {
            toast.error(jsonData.message);
        }
        setEditTodoLoadingId("")
        setLoad(false)
    }



    const handleDeleteTodo = async (id: string) => {
        setLoad(true)
        setDeleteTodoLoadingId(id)
        const response = await fetch(`api/todo`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
        const jsonData = await response.json();
        if (jsonData.success === true) {
            toast.success(jsonData.message);
            setFlag(!flag)
        } else {
            toast.error(jsonData.message);
        }
        setDeleteTodoLoadingId("")
        setLoad(false)
    }

    return (
        <>
            <AddEditTodoModal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                editTodo={editTodo}
                todoState={todoState}
                setFlag={setFlag}
                flag={flag}
                setLoad={setLoad}
                load={load}
                setTodoState={setTodoState}
            />
            <NavbarComponent
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                setEditTodo={setEditTodo}
                setTodoState={setTodoState}
            />
            <div className=''>
                <div className="flex flex-wrap justify-center">
                    {todoList.map((item: any, index: number) => (

                        <Card className='w-60 max-w-60 min-w-60 h-52 max-h-52 min-h-52 m-5' key={`_${item.id}-${index}`}>
                            <CardBody className='flex justify-between flex-col p-4'>
                                <div>
                                    <div>
                                        <h2 className='text-lg font-bold'>{textTruncate(item.title, 18)}</h2>
                                    </div>
                                    <div
                                        className='h-28 overflow-auto text-sm'
                                    >
                                        {textTruncate(item.description, 120)}
                                    </div>
                                </div>
                                <div className='self-end'>
                                    <Button
                                        color="primary"
                                        className="mr-4"
                                        size='sm'
                                        isLoading={load && editTodoLoadingId === item.id}
                                        onPress={() => {
                                            handleGetEditTodo(item.id)
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="danger"
                                        size='sm'
                                        isLoading={load && deleteTodoLoadingId === item.id}
                                        onPress={() => {
                                            handleDeleteTodo(item.id)
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))}

                </div>
            </div>
        </>
    )
}

export default Home
