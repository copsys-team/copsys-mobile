import { MigrationSchema } from "@/types/core";
import m1 from "./m1";
import m2 from "./m2";

export const schemas: Record<string, MigrationSchema> = {
  m1,
  m2
};
