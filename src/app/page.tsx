"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import { useDispatch, useSelector } from 'react-redux';
import { handleGetTodoRequest } from '@/redux/actions-reducers/todo/todo';
import toast from 'react-hot-toast';

const Home = () => {
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    const menuItems = [
        "Add Todo",
        "Log Out",
    ];
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

    const handleAddEditTodo = async (payload: any) => {
        setLoad(true)
        const response = await fetch(`api/todo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const jsonData = await response.json();
        if (jsonData.success === true) {
            toast.success(jsonData.message);
            setFlag(!flag)
            setModalIsOpen(!modalIsOpen)
        } else {
            toast.error(jsonData.message);
        }
        setLoad(false)
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (editTodo) {
            handleAddEditTodo({ ...todoState, id: editTodo.id })
        } else {
            handleAddEditTodo({ ...todoState })
        }
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
            <Modal isOpen={modalIsOpen} onOpenChange={() => setModalIsOpen(!modalIsOpen)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {editTodo ? "Update" : "Add"} Todo
                            </ModalHeader>
                            <form onSubmit={handleSubmit}>

                                <ModalBody>
                                    <Input
                                        type="text"
                                        label="Title"
                                        required
                                        onChange={(e) => setTodoState({ ...todoState, title: e.target.value })}
                                        value={todoState.title}
                                        placeholder="Enter todo title"
                                    />
                                    <Textarea
                                        label="Description"
                                        required
                                        onChange={(e) => setTodoState({ ...todoState, description: e.target.value })}
                                        value={todoState.description}
                                        placeholder="Enter your description"
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button
                                        isLoading={load}
                                        color="primary"
                                        type='submit'
                                    >
                                        {editTodo ? "Update" : "Add"}
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Navbar
                isBordered
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
            >
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>

                        <p className="font-bold text-inherit">Todo App</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarBrand>
                        <p className="font-bold text-inherit">Todo App</p>
                    </NavbarBrand>

                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem className="hidden sm:flex">
                        <Link onPress={() => {
                            setModalIsOpen(!modalIsOpen)
                            setEditTodo(null)
                            setTodoState({
                                title: "",
                                description: ""
                            })
                        }} className='cursor-pointer'>Add Todo</Link>
                    </NavbarItem>
                    <NavbarItem className="hidden sm:flex">
                        <Button as={Link} color="warning" href="#" variant="flat">
                            Logout
                        </Button>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                className="w-full"
                                color={
                                    index === menuItems.length - 1 ? "danger" : "warning"
                                }
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
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
