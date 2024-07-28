"use client"
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import toast from 'react-hot-toast';
const AddEditTodoModal = ({ setModalIsOpen, modalIsOpen, editTodo, todoState, setFlag, flag, setLoad, load, setTodoState }: any) => {
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
    return (
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
    )
}

export default AddEditTodoModal
