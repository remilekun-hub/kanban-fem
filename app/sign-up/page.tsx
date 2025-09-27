"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/actions/auth";
import { SignUpSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

const SignUp = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const form = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onBlur",
	});

	const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
		startTransition(async () => {
			const result = await signUp(data);
			if (result.success) {
				toast.success("Success", {
					description: "You have successfully signed up.",
				});
				router.push("/board");
			} else {
				toast.error("Error", {
					description: result.error,
				});
			}
		});
	};

	return (
		<div className="h-svh flex justify-center items-center">
			<div className="text-black w-full max-w-[500px] border-2 p-4 rounded-xl pb-6 lg:p-5 lg:pb-6">
				<h1 className="font-bold text-center text-3xl mb-7">Sign Up</h1>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name={"email"}
							render={({ field }) => (
								<FormItem className="mb-7">
									<FormLabel className="font-[700] text-[14px] text-muted dark:text-white">
										Email
									</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g example@mail.com"
											className="text-[rgba(130, 143, 163, .25)] !text-[13px] dark:caret-white caret-black text-black dark:text-white bg-white dark:bg-[#2B2C37] focus-visible:ring-0 flex-1 h-[40px] rounded-[4px] font-[500] border-muted/20 border-1 ring-0 outline-none ring-offset-0 focus-within:!border-primary"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={"password"}
							render={({ field }) => (
								<FormItem className="mb-7">
									<FormLabel className="font-[700] text-[14px] text-muted dark:text-white">
										Password
									</FormLabel>
									<FormControl>
										<Input
											className="text-[rgba(130, 143, 163, .25)] !text-[13px] dark:caret-white caret-black text-black dark:text-white bg-white dark:bg-[#2B2C37] focus-visible:ring-0 flex-1 h-[40px] rounded-[4px] font-[500] border-muted/20 border-1 ring-0 outline-none ring-offset-0 focus-within:!border-primary"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex flex-col gap-4 mt-5">
							<Button
								className="font-[700] h-[42px] text-[13px] cursor-pointer"
								disabled={isPending}
								type="submit"
							>
								{isPending ? (
									<Loader2 className="animate-spin size-4" />
								) : null}
								Submit
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default SignUp;
