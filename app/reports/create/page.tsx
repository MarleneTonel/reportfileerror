"use client";

import { useState, FormEventHandler, useRef } from "react";
import { useRouter } from "next/navigation";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import InputError from "../../../components/InputError";
import SelectInput from "../../../components/SelectInput";
import Textarea from "../../../components/Textarea";
import PocketBase from "pocketbase";
import PhotoIcon from "@heroicons/react/24/solid/PhotoIcon";

export default function CreateReport() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Curso errado");
  const [status, setStatus] = useState("pending");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const pb = new PocketBase("http://127.0.0.1:8090");

  // Cria o relatório
  const create: FormEventHandler = async (event) => {
    event.preventDefault();

    const file = fileRef.current?.files?.[0];
    const formData = new FormData();

    // Se o arquivo não estiver vazio, envia pro backend
    if (file !== undefined) {
      formData.append("name", name);
      formData.append("email", email);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("file", file);

      await pb.collection("support").create(formData);

      router.push("/success");
    }

    setName("");
    setEmail("");
    setCategory("");
    setDescription("");
    setStatus("pending");
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={create}
      className="flex justify-center"
    >
      <div className="space-y-6 w-[90%] sm:w-2/3 lg:w-1/2 xl:w-1/3">
        <div className="border-b border-gray-900/10 dark:border-gray-200/10 pb-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Notifique sobre um documento incorreto
          </h3>

          {/* Nome */}
          <div>
            <Label htmlFor="name">Nome</Label>

            <Input
              id="name"
              type="text"
              value={name}
              className="block mt-1 w-full"
              onChange={(event) => setName(event.target.value)}
            />

            <InputError messages={errors.name} className="mt-2" />
          </div>

          {/* Email */}
          <div className="mt-6">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={(event) => setEmail(event.target.value)}
            />

            <InputError messages={errors.email} className="mt-2" />
          </div>

          {/* Escolher Arquivo */}
          <div className="mt-6">
            <Label htmlFor="file">Escolher Arquivo</Label>

            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-200/25 px-3 py-6">
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-500"
                  aria-hidden="true"
                />
                <div className="mt-4 text-center text-sm leading-6 text-gray-600 dark:text-white">
                  <label
                    htmlFor="fileSelect"
                    className="relative cursor-pointer rounded-md font-semibold dark:file:text-gray-900 dark:text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2"
                  >
                    {/* <span>Adicione um arquivo</span> */}
                    <input
                      ref={fileRef}
                      id="fileSelect"
                      type="file"
                      className="file:rounded-md file:border-0 file:text-sm file:font-semibold file:primary-bg file:text-indigo-600"
                    />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-600 dark:text-gray-400">
                  PNG, JPG, PDF de até 10MB
                </p>
              </div>
            </div>

            <InputError messages={errors.file} className="mt-2" />
          </div>

          {/* Categoria */}
          <div className="mt-6">
            <Label htmlFor="category">Categoria</Label>

            <SelectInput
              id="category"
              value={category}
              className="block mt-1 w-full"
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="Curso errado">Curso errado</option>
              <option value="Nome da mãe errado">Nome da mãe errado</option>
              <option value="Problemas de leitura do arquivo, preciso em RTF">
                Problemas de leitura do arquivo, preciso em RTF
              </option>
              <option value="CPF ou RG errado">CPF ou RG errado</option>
            </SelectInput>

            <InputError messages={errors.category} className="mt-2" />
          </div>

          {/* Descrição */}
          <div className="mt-6">
            <Label htmlFor="description">Descrição</Label>

            <Textarea
              id="description"
              value={description}
              className="block mt-1 w-full"
              onChange={(event) => setDescription(event.target.value)}
            ></Textarea>

            <InputError messages={errors.description} className="mt-2" />
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Enviar
        </button>

        <a href="/" className="ml-4 btn btn-outline">
          Voltar
        </a>
      </div>
    </form>
  );
}
