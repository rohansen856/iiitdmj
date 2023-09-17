"use client"

import { useState } from "react"

import { redirect } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
})

interface UserAuthFormProps {
  formType: "login" | "register"
}

export function UserAuthForm({formType}: UserAuthFormProps) {
  const [isLoading, setLoading] = useState<boolean>(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try{

      if(formType === "register"){
        const { data, status } = await axios.post("/api/auth", {body: values})
        
        setLoading(false)
        if(status === 200) return redirect("/dashboard/profile")

        
      }else if(formType === "login"){
        const { data, status } = await axios.get("/api/auth", {
          params: {
            ...values
          }
        })
        
        setLoading(false)
        if(status === 200) console.log(data)
      }
    }catch(err){
      setLoading(false)
      return toast({
        title: "Something went wrong.",
        description: "There was an error. please try again later",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="my-1">
              <FormControl>
                <Input placeholder="rollno@iiitdmj.ac.in" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="my-1">
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit" variant={"default"} className="mt-5 w-full">
        {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ): "Submit"}
        </Button>
      </form>
    </Form>
  )
}
