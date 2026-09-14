import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


// Create Task
export async function POST(request: Request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

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

    const { title } = body as { title?: unknown };

    if (typeof title !== "string") {
        return NextResponse.json(
            { error: "Title is required" },
            { status: 400 }
        );
    }

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
        return NextResponse.json(
            { error: "Title is required" },
            { status: 400 }
        );
    }

    const task = await prisma.task.create({
        data: {
            title: trimmedTitle,
            userId: session.user.id,
        },
    });

    return NextResponse.json(task, {
        status: 201,
    });
}


// Get Task
export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const tasks = await prisma.task.findMany({
        where: {
            userId: session.user.id,
        },
    });

    return NextResponse.json(tasks);
}
