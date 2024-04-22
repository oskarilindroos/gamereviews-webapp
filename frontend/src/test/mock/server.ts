import { setupserver } from 'msw/node'
import { handlers } from './handlers'

export const server = setupserver(...handlers)