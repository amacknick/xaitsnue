
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "", // TODO Add env variable for GQL URL
  documents: "src/**/*.tsx",
  ignoreNoDocuments: true,
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: []
    },
    // "./graphql.schema.json": {
    //   // plugins: ["introspection"]
    // }
  }
};

export default config;
