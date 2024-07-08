"use client";
import { Chapter, MuxData } from "@prisma/client";
import { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import * as z from "zod";

import MuxPlayer from "@mux/mux-player-react"
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Video } from "lucide-react";
import toast from "react-hot-toast";

const formSchema = z.object({
  videoUrl: z.string().min(1)
});

interface IProps {
  initialData: Chapter & {muxData?: MuxData | null};
  courseId: string;
  chapterId: string
}
const ChapterVideoForm = ({ initialData, courseId, chapterId }: IProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toggleEdit();
      toast.success("Chaptet update Successful");
      router.refresh();
    } catch {
      toast.error("something went wrong.");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              {initialData.videoUrl ? (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit video
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add a video
                </>
              )}
            </>
          )}
        </Button>
      </div>
      {!isEditing && (

       !initialData.videoUrl ? (
        <div className="flex items-center justify-center h-60 bg-slate-200">
            <Video className="h-10 w-10 text-slate-500"/>
        </div>
        
       )
       :
        <div className="relative aspect-video mt-2">
           <MuxPlayer
            playbackId={initialData?.muxData?.playbackId || ""}
           />
           {/* video player */}
        </div>
      )}
      {isEditing && (
        <div className="">
            <FileUpload
                endpoint="chapterVideo"
                onChange={(url)=> {
                    if(url) onSubmit({videoUrl: url})
                }}
            />
            <div className="text-xs text-muted-foreground mt-4">
                upload this chapter's video
            </div>

        </div>
      )}
      {
        initialData.videoUrl && !isEditing && (
            <div className="text-xs text-muted-foreground mt-2 ">Videos can take a few minutes to process, Refresh if video does not appear.</div>
        )
      }
    </div>
  );
};

export default ChapterVideoForm;
