import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(4, { message: "O título deve ter no mínimo 4 caracteres." })
    .max(100, { message: "O título deve ter no máximo 100 caracteres." }),
  
  description: z
    .string()
    .min(90, { message: "A descrição deve ter no mínimo 90 caracteres." })
    .max(250, { message: "A descrição deve ter no máximo 250 caracteres." }),

  category: z
    .string()
    .nonempty({ message: "Por favor, selecione uma categoria." }),

  link: z
    .string()
    .url({ message: "Por favor, insira um link válido." })
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");
        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    }, { message: "O link não é uma imagem válida." }),

  pitch: z
    .string()
    .min(100, { message: "Sua receita deve ter no mínimo 100 caracteres." }),
});
