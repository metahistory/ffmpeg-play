module.exports = {
   root: true,
   env: { browser: true, es2020: true },
   extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
   ],
   ignorePatterns: ["dist", ".eslintrc.cjs"],
   parser: "@typescript-eslint/parser",
   plugins: ["react-refresh"],
   rules: {
      "react-refresh/only-export-components": [
         "warn",
         { "allowConstantExport": true },
      ],
      "indent": "off",
      "@typescript-eslint/indent": ["warn", 3],
      "quotes": [
         "warn",
         "double"
      ],
      "comma-dangle": [
         "warn",
         {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "always-multiline",
            "exports": "always-multiline",
            "functions": "always-multiline"
         }
      ]
   },
}
