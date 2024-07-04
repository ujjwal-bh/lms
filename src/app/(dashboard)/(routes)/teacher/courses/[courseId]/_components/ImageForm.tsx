"use client";
import { Course } from "@prisma/client";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";


import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

const formSchema = z.object({
  imageUrl: z.string().min(1, { message: "description is required" }),
});

interface IProps {
  initialData: Course;
  courseId: string;
}
const ImageForm = ({ initialData, courseId }: IProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/courses/${courseId}`, values);
      toggleEdit();
      toast.success("Course created");
      router.refresh();
    } catch {
      toast.error("something went wrong.");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              {initialData.imageUrl ? (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Image
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Image
                </>
              )}
            </>
          )}
        </Button>
      </div>
      {!isEditing && (

       !initialData.imageUrl ? (
        <div className="flex items-center justify-center h-60 bg-slate-200">
            <ImageIcon className="h-10 w-10 text-slate-500"/>
        </div>
        
       )
       :
        <div className="relative aspect-video mt-2">
            <Image src={initialData.imageUrl} alt="upload" fill className="object-cover rounded-md"/>
        </div>
      )}
      {isEditing && (
        <div className="">
            <FileUpload
                endpoint="courseImage"
                onChange={(url)=> {
                    if(url) onSubmit({imageUrl: url})
                }}
            />
            <div className="text-xs text-muted-foreground mt-4">
                16:9 aspect ratio recommended
            </div>

        </div>
      )}
    </div>
  );
};

export default ImageForm;
