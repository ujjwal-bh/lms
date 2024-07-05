"use client";
import { Course } from "@prisma/client";
import React, { useState } from "react";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  description: z.string().min(1, { message: "description is required" }),
});

interface IProps {
  initialData: Course
  courseId: string;
}
const DescriptionForm = ({ initialData, courseId }: IProps) => {
    const router = useRouter()
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description || ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/courses/${courseId}`, values);
      toggleEdit();
      toast.success("Description update Successful")
      router.refresh()
    } catch {
         toast.error("something went wrong.")
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">   
      <div className="font-medium flex items-center justify-between">
        Course Description
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Description
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className={cn("text-sm mt-2", !initialData.description && "text-slate-500 italic")}>{initialData.description || "No description"}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'This course is about ...'"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
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

export default DescriptionForm;
