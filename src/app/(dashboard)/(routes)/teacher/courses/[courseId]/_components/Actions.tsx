"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import ConfirmModal from "@/components/modals/ConfirmModal";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "../../../../../../../../hooks/use-confetti-store";

interface IProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}
const Actions = ({
  courseId,
  disabled,
  isPublished,
}: IProps) => {
  const confetti = useConfettiStore()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)


    const onClick = async () => {
        try{
            setIsLoading(true);
            if(isPublished){
                await axios.patch(`/api/courses/${courseId}/unpublish`)
                toast.success("Course unpublished")
                
              } else {
                await axios.patch(`/api/courses/${courseId}/publish`)
                toast.success("Course published")
                confetti.onOpen();
            }
            router.refresh()
            // router.push(`/teacher/courses/${courseId}`)
        } catch{
            toast.error("Something went wrong !!")
        } finally{
            setIsLoading(false)
        }
    }

    const onDelete = async () => {
        try{
            setIsLoading(true);
            await axios.delete(`/api/courses/${courseId}`)
            toast.success("Course deleted")
            router.refresh()
            router.push(`/teacher/courses`)
        } catch{
            toast.error("Something went wrong !!")
        } finally{
            setIsLoading(false)
        }
    }
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button size="sm" disabled={isLoading}>
        <ConfirmModal onConfirm={onDelete}>
            <Trash className="h-4 w-4" />
        </ConfirmModal>
      </Button>
    </div>
  );
};

export default Actions;
