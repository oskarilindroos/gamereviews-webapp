import { setupServer } from 'msw/node'
import { handlers } from './Handlers'

export const server = setupServer(...handlers)