"use client";

import { useEffect } from "react";
import PocketBase from "pocketbase";
import Card from "../../components/Card";
import Label from "../../components/Label";
import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function AuthLogin() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (pb.authStore.isValid) {
      router.push("/");
    }
  }, []);

  const login = async (data) => {
    try {
      await pb.collection("users").authWithPassword(data.email, data.password);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:mt-20 sm:flex sm:justify-center items-center">
      <Head>
        <title>iDocumentos - Login</title>
      </Head>
      <Card>
        <h3 className="text-lg font-semibold mb-4 text-center">
          Entre para continuar
        </h3>

        {/* Session Status */}
        {/* <AuthSessionStatus className="mb-4" status={status} /> */}

        <form onSubmit={handleSubmit(login)}>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">Email</Label>

            <input
              type="text"
              {...register("email")}
              className="block mt-1 w-full input"
              required
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>

            <input
              type="password"
              {...register("password")}
              className="block mt-1 w-full input"
              required
            />
          </div>

          {/* Remember Me */}
          {/* <div className="mt-4 flex justify-between">
                            <label
                                htmlFor="remember_me"
                                className="inline-flex items-center"
                            >
                                <Checkbox
                                    id="remember_me"
                                    name="remember"
                                    checked={shouldRemember}
                                    onChange={(event) =>
                                        setShouldRemember(event.target.checked)
                                    }
                                />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                    Remember me
                                </span>
                            </label>

                            <Link
                                href="/forgot-password"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Esqueceu sua senha?
                            </Link>
                        </div> */}

          <div className="flex justify-center mt-4">
            <button className="btn btn-primary w-full" type="submit">
              Entrar
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
