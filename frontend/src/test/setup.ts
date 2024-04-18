import '@testing-library/jest-dom';
import { server } from './mock/Server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())