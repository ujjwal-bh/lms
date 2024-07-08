"use client";
import React, { useState } from "react";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { toast } from "react-hot-toast";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface IProps {
  playbackId: string;
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}
const VideoPlayer = ({
  chapterId,
  completeOnEnd,
  courseId,
  isLocked,
  playbackId,
  title,
  nextChapterId,
}: IProps) => {
  const [isReady, setIsReady] = useState(false);

  const router = useRouter();

  const confetti = useConfettiStore();

  const onEnd = async () => {
    try {
      console.log("complete on end", completeOnEnd);
      console.log(1);
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );

        router.refresh();

        if (!nextChapterId) {
          confetti.onOpen();
        }

        if (nextChapterId) {
          setTimeout(() => {
            router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
          }, 300);
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="relative aspect-video">
      {isLocked ? (
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-y-2 bg-slate-800 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      ) : (
        <>
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
              <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
          )}
        </>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
