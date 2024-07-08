"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import toast from 'react-hot-toast';
import axios from 'axios';


interface IProps {
    chapterId: string,
    courseId: string,
    isCompleted?: boolean,
    nextChapterId?: string
}
const CourseProgressButton =  ({chapterId,courseId,isCompleted,nextChapterId}: IProps) => {

    
    const Icon = isCompleted ? XCircle : CheckCircle;

    const router = useRouter()
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: !isCompleted
      });

      if(!isCompleted && !nextChapterId){
        confetti.onOpen();
      }
      if(!isCompleted && nextChapterId){
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
      }
      toast.success("Progess updated")
      router.refresh()
    } catch {
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
 
    return (
        <Button type='button' variant={isCompleted? "outline": "success"} className="w-full md:w-auto" onClick={onClick}>
        {
            isCompleted ?
            "Not completed" : "Mark as complete"
        }
        <Icon className='h-4 w-4 ml-2'/>
        </Button>
      );
}

export default CourseProgressButton