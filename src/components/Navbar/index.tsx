"use client"
import React, { useState } from 'react'
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
const NavbarComponent = ({ setModalIsOpen, modalIsOpen, setEditTodo, setTodoState }: any) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "Add Todo",
        // "Log Out",
    ];
    return (
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
                {/* <NavbarItem className="hidden sm:flex">
                    <Button as={Link} color="warning" href="#" variant="flat">
                        Logout
                    </Button>
                </NavbarItem> */}
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                "warning"
                                // index === menuItems.length - 1 ? "danger" : "warning"
                            }
                            onPress={(e) => {
                                if (item === "Add Todo") {
                                    setModalIsOpen(!modalIsOpen)
                                    setEditTodo(null)
                                    setTodoState({
                                        title: "",
                                        description: ""
                                    })
                                }
                            }}
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}

export default NavbarComponent
