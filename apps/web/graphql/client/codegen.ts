import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  generates: {
    "./graphql/__generated__/": {
      preset: "client",
      plugins: ["typescript", "typescript-operations"],
      config: {
        strictScalars: true,
        scalars: {
          DateTime: "string",
          JSON: "Record<string, unknown>",
        },
      },
    },
  },
  schema: "http://localhost:3000/graphql",
};

export default config;
