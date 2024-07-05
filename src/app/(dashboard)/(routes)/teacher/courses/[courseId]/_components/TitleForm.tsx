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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
});

interface IProps {
  initialData: {
    title: string;
  };
  courseId: string;
}
const TitleForm = ({ initialData, courseId }: IProps) => {
    const router = useRouter()
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/courses/${courseId}`, values);
      toggleEdit();
      toast.success("Title update successful")
      router.refresh()
    } catch {
         toast.error("something went wrong.")
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">   
      <div className="font-medium flex items-center justify-between">
        Course title
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g 'Advanced web development'"
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

export default TitleForm;
