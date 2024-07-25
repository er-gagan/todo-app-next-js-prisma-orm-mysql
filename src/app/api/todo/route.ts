import prisma from "@/lib/prisma/client"
import { NextRequest, NextResponse } from "next/server"
import qs from 'qs';

export async function POST(request: NextRequest) {
    try {
        let payload: any = await request.json()
        const { id, title, description } = payload

        if (!title || !description) return NextResponse.json({ success: false, message: "Title and description are required" }, { status: 400 })

        if (id) {
            const todo = await prisma.todo.update({
                where: {
                    id: Number(id)
                },
                data: {
                    title,
                    description
                }
            })
            return NextResponse.json({ success: true, message: "Todo updated successfully", data: todo }, { status: 200 })
        } else {
            const todo = await prisma.todo.create({
                data: {
                    title,
                    description
                }
            })
            return NextResponse.json({ success: true, message: "Todo created successfully", data: todo }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: "Something went wrong", data: error }, { status: 500 })
    }
}

export async function GET(request: NextRequest) {
    try {
        const rawParams = request.url.split('?')[1];
        const params: any = qs.parse(rawParams);
        const { id, currentPage, perPage, search } = params
        const _currentPage = Number(currentPage)
        const _perPage = Number(perPage)
        if (id) {
            const todo = await prisma.todo.findUnique({
                where: {
                    id: Number(id)
                }
            })
            return NextResponse.json({ success: true, message: "Todo fetched successfully", data: todo }, { status: 200 })
        } else if (currentPage && perPage && !search) {
            const count = await prisma.todo.count()
            const todos = await prisma.todo.findMany({
                skip: (_currentPage - 1) * _perPage,
                take: _perPage
                // orderBy: {
                //     created_at: 'desc',
                // }    
            })

            return NextResponse.json({ success: true, message: "Todos fetched successfully", data: { todos, count } }, { status: 200 })
        } else if (currentPage && perPage && search) {
            const count = await prisma.todo.count()
            const todos = await prisma.todo.findMany({
                where: {
                    OR: [
                        {
                            title: {
                                contains: search
                            }
                        },
                        {
                            description: {
                                contains: search
                            }
                        }
                    ]
                },
                skip: (_currentPage - 1) * _perPage,
                take: _perPage
            })
            return NextResponse.json({ success: true, message: "Todos fetched successfully", data: { todos, count } }, { status: 200 })
        } else {
            const todos = await prisma.todo.findMany()
            return NextResponse.json({ success: true, message: "Todos fetched successfully", data: todos }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: "Something went wrong", data: error }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json()
        if (!id) return NextResponse.json({ success: false, message: "Id is required" }, { status: 400 })
        if (Array.isArray(id) && id.length > 0) {
            const todo = await prisma.todo.deleteMany({
                where: {
                    id: {
                        in: id
                    }
                }
            })
            return NextResponse.json({ success: true, message: "Todos deleted successfully", data: todo }, { status: 200 })
        } else {
            const todo = await prisma.todo.delete({
                where: {
                    id: Number(id)
                }
            })
            return NextResponse.json({ success: true, message: "Todo deleted successfully", data: todo }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: "Something went wrong", data: error }, { status: 500 })
    }
}