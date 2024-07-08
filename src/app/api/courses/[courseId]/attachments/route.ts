import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId || !isTeacher(userId)) return new NextResponse("Unautorized", { status: 401 });

    const { url }: {url: string} = await req.json();
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });
    if (!courseOwner) return new NextResponse("Unautorized", { status: 401 });


    const attachment = await db.attachment.create({
        data: {
            url,
            name: url.split("/").pop() || "default name",
            courseId: params.courseId
        }
    })
    return NextResponse.json(attachment)
  } catch (error) {
    console.log("[course id attachments", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
