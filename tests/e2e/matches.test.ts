import request from 'supertest'
import { Express } from 'express'
import { setupServer } from '../../src/config/server'

describe('POST /matches/roll', () => {
  let app: Express

  beforeAll(async () => {
    app = await setupServer()
  })

  test('should return 422', async () => {
    const response = await request(app)
      .post('/api/matches/roll')
      .send({
        players: [
          {
            id: null,
            name: '',
            roll: ''
          }, {
            id: 1,
            name: null,
            roll: null
          }, {
            id: 2,
            name: 'Jogador 1',
            roll: '2dr3'
          }
        ]
      })

    const { body, status } = response
    expect(status).toStrictEqual(422)
    expect(body).toStrictEqual(
      expect.objectContaining({
        message: 'Os dados informados são inválidos',
        errors: [
          {
            field: 'players.0.id',
            message: 'ID do jogador inválido'
          },
          {
            field: 'players.0.name',
            message: 'informe nome do jogador'
          },
          {
            field: 'players.0.roll',
            message: 'Formato da jogada inválida'
          },
          {
            field: 'players.1.name',
            message: 'O nome do jogador deve ser um texto'
          },
          {
            field: 'players.1.roll',
            message: 'A jogada deve ser um texto'
          },
          {
            field: 'players.2.roll',
            message: 'Formato da jogada inválida'
          }
        ]
      })
    )
  })

  test('should return 400 - invalid roll', async () => {
    const response = await request(app)
      .post('/api/matches/roll')
      .send({
        players: [
          {
            id: 1,
            name: 'Jogador 1',
            roll: '2d4'
          }, {
            id: 2,
            name: 'Jogador 2',
            roll: '5dd3'
          }
        ]
      })

    const { body, status } = response
    expect(status).toEqual(400)
    expect(body.message).toStrictEqual('Falha ao processar jogada')
    expect(body.errors).toStrictEqual(expect.arrayContaining([
      expect.objectContaining({
        message: 'O jogador "Jogador 2" fez sua jogada incorreta.'
      })
    ]))
  })

  test('should return 200', async () => {
    const response = await request(app)
      .post('/api/matches/roll')
      .send({
        players: [
          {
            id: 1,
            name: 'Jogador 1',
            roll: '2d6'
          }, {
            id: 2,
            name: 'Jogador 2',
            roll: 'd5'
          }, {
            id: 3,
            name: 'Jogador 3',
            roll: '7d12'
          }
        ]
      })

    const { body, status } = response
    expect(status).toStrictEqual(200)
    expect(body).toStrictEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        matches: expect.any(Array),
        total: expect.any(Number)
      })
    ]))
  })
})