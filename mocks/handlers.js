// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
    // Handles a POST /login request
    rest.post('/login', null),

    // Handles a GET /user request
    rest.get('/user', null),

    // Handles a GET /user request
    rest.get('https://petstore.swagger.io/v2/pet/1', null),
]