"use client";

import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { SubmitButton } from "@/app/components/atoms/submit-button";
import { getUserAdmin } from "@/app/helpers/loginHelper";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { LuLoader } from "react-icons/lu";
import { setToaster } from "@/app/redux/slices/reduxToasterSlices";
import { useRouter } from "next/navigation";
import { setLocalStorage } from "@/app/helpers/sessionHelpers";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type Form = z.infer<typeof schema>;

export function Form({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const route = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Form> = async (data) => {
    setLoading(true);
    console.log("Form data : ", data);

    let res = await getUserAdmin(data);

    if (res.status == 404 || res.status == 400) {
      setError(res.message);
    }

    if (res.status == 200) {
      setError("");
      setLocalStorage(res.payload, res.token || "");
      dispatch(setToaster({ message: "Login success", show: true }));
      setTimeout(() => {
        route.push("/dashboard");
      }, 1000);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      {error && (
        <div className="bg-red-500 text-white rounded-md py-2 px-4">
          <p className="text-sm">{error}</p>
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          Email Address
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="user@acme.com"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>
      <SubmitButton>
        {loading && <LuLoader className="animate-spin mr-2" />}
        Sign in
      </SubmitButton>
      {children}
    </form>
  );
}
