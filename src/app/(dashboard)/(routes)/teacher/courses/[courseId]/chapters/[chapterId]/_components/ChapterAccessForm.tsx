"use client";
import { Chapter } from "@prisma/client";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  isFree: z.boolean().default(false)
});

interface IProps {
  initialData: Chapter
  courseId: string;
  chapterId: string
}

const ChapterAccessForm = ({ initialData, courseId, chapterId }: IProps) => {
    const router = useRouter()
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData.isFree
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toggleEdit();
      toast.success("Chapter update Successful")
      router.refresh()
    } catch {
         toast.error("something went wrong.")
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">   
      <div className="font-medium flex items-center justify-between">
        Chapter access
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit access
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className={cn("text-sm mt-2", !initialData.isFree && "text-slate-500 italic")}>
        {
            initialData.isFree ? "This chapter is free for preview" : "This chapter is not free"
        }
        </p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}

                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormDescription>
                            Check this box if you want to make this chapter free for preview
                        </FormDescription>
                    </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
                <Button
                disabled={!isValid || isSubmitting}
                >
                    Save
                </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterAccessForm;
