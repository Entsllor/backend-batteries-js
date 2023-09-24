import {defineConfig} from 'vitest/config'

export default defineConfig({
    test: {
        typecheck: {
            include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)', '**/*.{test,spec}-d.?(c|m)[jt]s?(x)'],
            tsconfig: './tsconfig.typechecking.json'
        }
    },
})
