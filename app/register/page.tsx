import Card from "../../components/Card";
import GuestLayout from "../../components/Layouts/GuestLayout";
import Input from "../../components/Input";
import InputError from "../../components/InputError";
import Label from "../../components/Label";
import Link from "next/link";
import { useAuth } from "../../hooks/auth";
import { useState, FormEventHandler } from "react";
import Head from "next/head";
import PrimaryButton from "../../components/PrimaryButton";

const Register = () => {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  const submitForm: FormEventHandler = (event) => {
    event.preventDefault();

    register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setStatus: () => {},
    });
  };

  return (
    <GuestLayout>
      <Head>
        <title>iDocumentos - Register</title>
      </Head>

      <div className="min-h-screen sm:flex sm:justify-center items-center">
        <Card>
          <h3 className="text-lg font-semibold mb-4 text-center">
            Cadastro de funcionário
          </h3>

          <form onSubmit={submitForm}>
            {/* Name */}
            <div>
              <Label htmlFor="name">Nome</Label>

              <Input
                id="name"
                type="text"
                value={name}
                className="block mt-1 w-full"
                onChange={(event) => setName(event.target.value)}
                required
                autoFocus
              />

              <InputError messages={errors.name} className="mt-2" />
            </div>

            {/* Email Address */}
            <div className="mt-4">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                value={email}
                className="block mt-1 w-full"
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <InputError messages={errors.email} className="mt-2" />
            </div>

            {/* Password */}
            <div className="mt-4">
              <Label htmlFor="password">Senha</Label>

              <Input
                id="password"
                type="password"
                value={password}
                className="block mt-1 w-full"
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="new-password"
              />

              <InputError messages={errors.password} className="mt-2" />
            </div>

            {/* Confirm Password */}
            <div className="mt-4">
              <Label htmlFor="passwordConfirmation">Confirme a Senha</Label>

              <Input
                id="passwordConfirmation"
                type="password"
                value={passwordConfirmation}
                className="block mt-1 w-full"
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
                required
              />

              <InputError
                messages={errors.password_confirmation}
                className="mt-2"
              />
            </div>

            <div className="flex items-center justify-evenly mt-4">
              <Link
                href="/"
                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                Voltar
              </Link>
              <PrimaryButton type="submit">Registrar</PrimaryButton>
            </div>
          </form>
        </Card>
      </div>
    </GuestLayout>
  );
};

export default Register;
