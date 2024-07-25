"use client"
import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";

const page = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = data.get('title')
        const description = data.get('description')
        console.log({ title, description })
        onOpenChange()
    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Add Todo
                            </ModalHeader>
                            <form onSubmit={handleSubmit}>

                                <ModalBody>
                                    <Input
                                        type="text"
                                        label="Title"
                                        name='title'
                                        required
                                        placeholder="Enter todo title"
                                    />
                                    <Textarea
                                        label="Description"
                                        name='description'
                                        required
                                        placeholder="Enter your description"
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" type='submit' >
                                        Save
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
                        <Link onPress={() => onOpen()} className='cursor-pointer'>Add Todo</Link>
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
                    <Card className='w-60 max-w-60 min-w-60 h-52 max-h-52 min-h-52 m-5'>
                        <CardBody className='flex justify-between flex-col p-4'>
                            <div
                                className=''
                            >
                                {textTruncate("Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, veniam nulla. Beatae perferendis accusantium quos, esse est dolorem ipsum autem nihil quam quod minus neque delectus quo, ducimus incidunt non numquam fugiat fuga libero amet maiores deleniti, eveniet vitae? Doloremque.", 120)}

                            </div>
                            <div className='self-end'>
                                <Button color="primary" className='mr-4' size='sm'>Edit</Button>
                                <Button color="danger" size='sm'>Delete</Button>
                            </div>
                        </CardBody>
                    </Card>

                </div>
            </div>
        </>
    )
}

export default page
