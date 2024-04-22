import { http, HttpResponse } from 'msw'
import { mockGameData, mockReviews } from './MockData'

export const handlers = [
    http.get(`http://localhost:5050/api/games/${mockGameData.igdbId}`, () =>{
        return HttpResponse.json(mockGameData, {status: 200})
    }),
    http.get(`http://localhost:5050/api/games/${mockGameData.igdbId}/reviews`, () =>{
        return HttpResponse.json(mockReviews, {status: 200})
    }),
]