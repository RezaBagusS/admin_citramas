'use client'

import { Form } from "@/app/components/molecules/form";
import { Provider } from "react-redux";
import store from "@/app/redux/store";
import Toaster from "./components/molecules/toaster";

export default function Login() {
  return (
    <Provider store={store}>
      <Toaster />
      <div className="flex h-screen w-screen items-center justify-center bg-sky-200">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">Citramas Admin Panel</h3>
            <p className="text-sm text-gray-500">
              Use your email and password to sign in as a Admin.
            </p>
          </div>
          <Form>
            <p className="text-center text-sm text-gray-600">
              if any problem, please contact us.
            </p>
          </Form>
        </div>
      </div>
    </Provider>
  );
}
