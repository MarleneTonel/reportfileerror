"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Label from "../../components/Label";
import Input from "../../components/Input";
import InputError from "../../components/InputError";
import Card from "../../components/Card";
import FileInput from "../../components/FileInput";
import SelectInput from "../../components/SelectInput";
import Textarea from "../../components/Textarea";

export default function CreateReport() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
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
      }),
    });

    setName("");
    setEmail("");
    setCategory("");
    setDescription("");

    router.refresh();
  };

  return (
    <div className="h-[92vh] sm:h-[94vh] sm:flex sm:justify-center sm:items-center">
      <Card>
        <h3 className="text-lg font-semibold mb-4 text-center">
          Notifique sobre um documento incorreto
        </h3>

        <form onSubmit={create}>
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

          {/* Escolher Arquivo */}
          {/* <div className="mt-4">
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
          <div className="mt-4">
            <Label htmlFor="category">Categoria</Label>

            <SelectInput
              id="category"
              value={category}
              className="block mt-1 w-full"
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              <option value="1">Curso errado</option>
              <option value="2">Nome da mãe errado</option>
              <option value="3">
                Problemas de leitura do arquivo, preciso em RTF
              </option>
              <option value="4">CPF ou RG errado</option>
            </SelectInput>

            <InputError messages={errors.category} className="mt-2" />
          </div>

          {/* Descrição */}
          <div className="mt-4">
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

          <div className="flex justify-center mt-4">
            <button className="w-full btn btn-primary" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
