import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string} }
) {
    try{
        const {userId} = auth();
        if(!userId || !isTeacher(userId)) return new NextResponse("Unauthorized", { status: 401 });
        const courseOwner = await db.course.findUnique({
            where: {
              id: params.courseId,
              userId,
            },
          });
          if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });
      
          const course = await db.course.findUnique({
            where: {
              id: params.courseId,
              userId
            },
            include: {
              chapters:{
                include: {
                  muxData: true
                }
              }
            }
          })

          if(!course) return new NextResponse("Not found", {status: 404})
          
            const unpublishedCourse = await db.course.update({
              where: {
                id: params.courseId,
                userId
              }, data: {
                isPublished: false
              }
            })
      


          
          return  NextResponse.json(unpublishedCourse);

      
    } catch (error) {
        console.log("[course unpublish]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
      }
}
