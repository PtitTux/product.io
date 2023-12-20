import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: false,
    typescript: true,
  },
  {
    rules:
    {
      'unused-imports/no-unused-imports': 'error',
    },
  },
)
