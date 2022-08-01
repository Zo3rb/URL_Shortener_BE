import { object, string } from "zod";

export const createUrlSchema = object({
  body: object({
    destination: string({
      required_error: "Destination Link is Required",
    }).url({
      message: "Destination Should Be a Valid URL Link",
    }),
  }),
});
