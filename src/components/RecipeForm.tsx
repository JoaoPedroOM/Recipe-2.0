"use client";

import React, { useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CookingPot } from 'lucide-react';

const RecipeForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");

  const isPending = false

  return (
    <form
      action={() => {}}
      className="max-w-[680px] mx-auto bg-white my-10 space-y-8 px-6 font-nunito"
    >
      <div>
        <label
          htmlFor="title"
          className="font-bold text-[18px] text-black uppercase font-nunito"
        >
          Título
        </label>
        <Input
          id="title"
          name="title"
          required
          className="w-full bg-transparent outline-none px-4 py-5 text-base rounded-xl border focus:ring-0"
          placeholder="Título da receita"
        />
        {errors.title && (
          <p className="text-red-500 mt-2 ml-5">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="font-bold text-[18px] text-black uppercase font-nunito"
        >
          Descrição
        </label>
        <Input
          id="description"
          name="description"
          required
          className="w-full bg-transparent outline-none px-4 py-5 text-base rounded-xl border focus:ring-0"
          placeholder="Descrição da receita"
        />
        {errors.description && (
          <p className="text-red-500 mt-2 ml-5">{errors.description}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="font-bold text-[18px] text-black uppercase font-nunito"
        >
          Categoria
        </label>
        <select
          id="category"
          name="category"
          required
          className="w-full bg-transparent outline-none px-4 py-4 text-base rounded-xl border border-[#f49140] focus-visible:ring-[#f49140] focus:ring-0"
        >
          <option value="">Selecione uma categoria</option>
          <option value="doce">Doce</option>
          <option value="salgado">Salgado</option>
          <option value="massa">Massa</option>
          <option value="bebida">Bebida</option>
          <option value="sobremesa">Sobremesa</option>
        </select>
        {errors.category && (
          <p className="text-red-500 mt-2 ml-5">{errors.category}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="link"
          className="font-bold text-[18px] text-black uppercase font-nunito"
        >
          URL da imagem
        </label>
        <Input
          id="link"
          name="link"
          required
          className="w-full bg-transparent outline-none px-4 py-5 text-base rounded-xl border focus:ring-0"
          placeholder="Digite a URL da imagem"
        />
        {errors.link && <p className="text-red-500 mt-2 ml-5">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label
          htmlFor="pitch"
          className="font-bold text-[18px] text-black uppercase font-nunito"
        >
          Receita
        </label>
        <MarkdownEditor
          value={pitch}
          id="pitch"
          height="300px"
          style={{ overflow: "hidden" }}
          placeholder="Escreva sua receita aqui ❤"
          onChange={(value) => setPitch(value as string)}
        />
        {errors.pitch && (
          <p className="text-red-500 mt-2 ml-5">{errors.pitch}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full mx-auto h-12 animate-background-shine items-center justify-center rounded-md border-2 border-[#FFA500] bg-[linear-gradient(110deg,#FF6A00,45%,#FF8C00,55%,#FFA500)] bg-[length:200%_100%] hover:border-[#FF7F00] hover:bg-[linear-gradient(110deg,#FF7F00,45%,#FF4500,55%,#FF7F00)] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF4500] focus:ring-offset-2 focus:ring-offset-gray-50 text-base"
      >
        {isPending ? "Enviando..." : "Enviar minha receita"}
        <CookingPot/>
      </Button>
    </form>
  );
};

export default RecipeForm;
