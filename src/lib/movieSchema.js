import { z } from "zod/v4";

export const movieSchema = z.object({
  title: z.string().min(2, "Nazev musi mit alespon 2 znaky."),
  director: z.string().min(2, "Reziser musi mit alespon 2 znaky."),
  year: z.coerce
    .number()
    .int("Rok musi byt cele cislo.")
    .min(1888, "Rok musi byt 1888 nebo novejsi.")
    .max(2100, "Rok musi byt realny."),
  genre: z.string().min(2, "Zanr musi mit alespon 2 znaky."),
  rating: z.coerce
    .number()
    .min(0, "Hodnoceni musi byt alespon 0.")
    .max(10, "Hodnoceni muze byt maximalne 10."),
  duration: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Delka musi byt ve formatu HH:MM."),
});
