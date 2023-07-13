"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import InputError from "../../../components/InputError";
import Card from "../../../components/Card";
import FileInput from "../../../components/FileInput";
import SelectInput from "../../../components/SelectInput";
import Textarea from "../../../components/Textarea";

export default function CreateReport() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState([]);
  const [category, setCategory] = useState("Curso errado");
  const [status, setStatus] = useState("pending");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  const create = async () => {
    await fetch("http://127.0.0.1:8090/api/collections/support/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        category,
        description,
        status,
        // file,
      }),
    });

    setName("");
    setEmail("");
    setCategory("");
    setDescription("");
    setStatus("pending");
    setFile([]);

    router.push("/success");
  };

  return (
    <form onSubmit={create} className="flex justify-center">
      <div className="space-y-6 w-1/3">
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
              required
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
              required
            />

            <InputError messages={errors.email} className="mt-2" />
          </div>

          {/* Escolher Arquivo */}
          {/* <div className="mt-6">
            <Label htmlFor="file">Escolher Arquivo</Label>

            <FileInput
              id="file"
              value={file}
              className="block mt-1 w-full"
              onChange={(event) => setFile(event.target.value)}
              required
            />

            <InputError messages={errors.file} className="mt-2" />
          </div> */}

          {/* Categoria */}
          <div className="mt-6">
            <Label htmlFor="category">Categoria</Label>

            <SelectInput
              id="category"
              value={category}
              className="block mt-1 w-full"
              onChange={(event) => setCategory(event.target.value)}
              required
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
              required
            ></Textarea>

            <InputError messages={errors.description} className="mt-2" />
          </div>
        </div>
          <button className="btn btn-primary" type="submit">
            Enviar
          </button>

          <a href="/" className="ml-2 btn btn-outline">
            Voltar
          </a>
      </div>
    </form>
  );
}
