import { http, HttpResponse } from 'msw'
import { mockGameData, mockReviews } from './mockData'

export const handlers = [
    http.get('http://localhost:5050/api/games/119171', () =>{
        return HttpResponse.json(mockGameData, {status: 200})
    }),
    http.get('http://localhost:5050/api/games/119171/reviews', () =>{
        return HttpResponse.json(mockReviews, {status: 200})
    }),
]