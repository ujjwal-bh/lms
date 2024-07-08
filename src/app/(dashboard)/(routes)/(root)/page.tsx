import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import CoursesList from "@/components/CoursesList";
import { auth } from "@clerk/nextjs/server"
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation"
import InfoCard from "./_components/InfoCard";

export default async function Dashboard() {
    const {userId} = auth()

    if(!userId) return redirect("/");

    const {completedCourses, coursesInProgress} = await getDashboardCourses(userId);

    return (
         <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <InfoCard
                icon={Clock}
                label="In progress"
                numberOfItems={coursesInProgress.length}

               />
               <InfoCard
                icon={CheckCircle}
                label="Completed"
                numberOfItems={completedCourses.length}

               />
                <div>
                    {/* todo card */}
                </div>
            </div>
            <CoursesList items={[...coursesInProgress, ...completedCourses]}/>
        </div>
    )
  }
  