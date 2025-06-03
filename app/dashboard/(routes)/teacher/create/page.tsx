/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormDescription,
  FormMessage,
  FormItem,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "El nombre del curso es requerido",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/dashboard/teacher/courses/${response.data.id}`);
    } catch (error) {
      console.error("Error al crear el curso:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl font-bold">
          Nombre del Curso
        </h1>
        <p className="text-center text-muted-foreground">
          Crea un nuevo curso para tus alumnos
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del curso</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Nombre del curso"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Este nombre será visible para tus alumnos.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          
          <div className="flex items-center gap-x-2">
            <Link href="/">
              <Button variant="linkLms" type="button">
                Cancelar
              </Button>
            </Link>
            <Button
              variant="neonPurple"
              className="ml-auto"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Continuar
            </Button>
          </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;