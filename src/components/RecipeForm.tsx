"use client";

import React, { useActionState, useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CookingPot } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const RecipeForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast({
          title: "Sucesso",
          description: "Sua receita foi criada com sucesso 🥘",
        });

        router.push(`/recipe/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Por favor, verifique seus dados e tente novamente",
          variant: "destructive",
        });

        return { ...prevState, error: "Falha na validação", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "Ocorreu um erro inesperado",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "Ocorreu um erro inesperado",
        status: "ERROR",
      };
    } finally {
    }
  };
  
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form
      action={formAction}
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
        {errors.title && <p className="text-red-500 mt-2">{errors.title}</p>}
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
          <p className="text-red-500 mt-2">{errors.description}</p>
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
          <option value="Doce">Doce</option>
          <option value="Salgado">Salgado</option>
          <option value="Massa">Massa</option>
          <option value="Bebida">Bebida</option>
          <option value="Sobremesa">Sobremesa</option>
        </select>
        {errors.category && (
          <p className="text-red-500 mt-2">{errors.category}</p>
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
        {errors.link && <p className="text-red-500 mt-2">{errors.link}</p>}
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
        {errors.pitch && <p className="text-red-500 mt-2">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full mx-auto h-12 animate-background-shine items-center justify-center rounded-md border-2 border-[#FFA500] bg-[linear-gradient(110deg,#FF6A00,45%,#FF8C00,55%,#FFA500)] bg-[length:200%_100%] hover:border-[#FF7F00] hover:bg-[linear-gradient(110deg,#FF7F00,45%,#FF4500,55%,#FF7F00)] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF4500] focus:ring-offset-2 focus:ring-offset-gray-50 text-base"
      >
        {isPending ? "Enviando..." : "Enviar minha receita"}
        <CookingPot />
      </Button>
    </form>
  );
};

export default RecipeForm;
