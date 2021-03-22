import { queryType } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.string('hello', {
      resolve: async () => {
        return 'hi'
      }
    })
  }
})
