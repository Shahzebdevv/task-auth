import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


// Update Task
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { id } = await params;

    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 }
        );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 }
        );
    }

    const { completed } = body as { completed?: unknown };

    if (typeof completed !== "boolean") {
        return NextResponse.json(
            { error: "completed must be a boolean" },
            { status: 400 }
        );
    }

    const task = await prisma.task.findFirst({
        where: {
            id,
            userId: session.user.id,
        },
    });

    if (!task) {
        return NextResponse.json(
            { error: "Task not found" },
            { status: 404 }
        );
    }

    const updatedTask = await prisma.task.update({
        where: {
            id: task.id,
        },
        data: {
            completed,
        },
    });

    return NextResponse.json(updatedTask);
}


// Delete Task
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { id } = await params;

    const task = await prisma.task.findFirst({
        where: {
            id,
            userId: session.user.id,
        },
    });

    if (!task) {
        return NextResponse.json(
            { error: "Task not found" },
            { status: 404 }
        );
    }

    await prisma.task.delete({
        where: {
            id: task.id,
        },
    });

    return NextResponse.json({
        message: "Task deleted",
    });
}
