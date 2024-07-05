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
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";

const formSchema = z.object({
  price: z.coerce.number(),
});

interface IProps {
  initialData: Course;
  courseId: string;
}
const PriceForm = ({ initialData, courseId }: IProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData.price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/courses/${courseId}`, values);
      toggleEdit();
      toast.success("Price update Successful");
      router.refresh();
    } catch {
      toast.error("something went wrong.");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course price
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.price && "text-slate-500 italic"
          )}
        >
          {initialData.price ? formatPrice(initialData.price) : "No price"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      disabled={isSubmitting}
                      placeholder="Set a price for your course"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting}>Save</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default PriceForm;
