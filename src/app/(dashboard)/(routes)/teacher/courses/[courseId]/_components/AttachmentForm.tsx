"use client";
import { Attachment, Course } from "@prisma/client";
import { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import * as z from "zod";

import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import toast from "react-hot-toast";

const formSchema = z.object({
  url: z.string().min(1),
});

interface IProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}
const AttachmentForm = ({ initialData, courseId }: IProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null)


  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/attachments`, values);
      toggleEdit();
      toast.success("Operation Successful");
      router.refresh();
    } catch {
      toast.error("something went wrong.");
    }
  };
  
  const onDelete = async (id: string) => {
    try {
        setDeletingId(id)
      const response = await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("something went wrong.");
    } finally{
        setDeletingId(null)
    }
  };

  
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachmemnts
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add attachment
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 ? (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          ):
          <div className="space-y-4 py-2">
            {
                initialData.attachments.map(attachment => (
                    <div className="flex items-center w-full bg-primary/20 border text-primary rounded-md p-2" key={attachment.id}>

                        <File className="h-4 w-4 mr-2 flex-shrink-0"/>
                        <p className="text-xs line-clamp-1">
                            {attachment.name}
                        </p>
                        {
                            deletingId === attachment.id ? (
                                <div>
                                    <Loader2 className="h-4 w-4 animate-spin"/>
                                </div>
                            ): (
                                <button className="ml-auto hover:opacity-70 transition" onClick={()=> onDelete(attachment.id)}>
                                    <X className="h4 w-4"/>
                                </button>
                            )
                        }
                    </div>
                ))
            }
          </div>
        }
        </>
      )}
      {isEditing && (
        <div className="">
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) onSubmit({ url });
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anythinh your students might need to complete the course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
