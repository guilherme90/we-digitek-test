import { z } from 'zod'
import { Request, Response, NextFunction } from 'express'
import { validator } from '@/config/interfaces/middlewares/validators.middleware'
import { PLAY_FORMAT_REGEX } from '@/utils'

export function matchValidator(request: Request, response: Response, next: NextFunction): Response {
  const constraints = z.object({
    players: z.array(
      z.object({
        id: z
          .number({
            required_error: 'Informe o ID do jogador',
            invalid_type_error: 'ID do jogador inválido'
          })
          .positive({
            message: 'Id deve ser maior que 1'
          }),
        name: z
          .string({
            invalid_type_error: 'O nome do jogador deve ser um texto'
          })
          .min(1, {
            message: 'informe nome do jogador'
          }),
        roll: z
          .string({
            required_error: 'Informe a jogada',
            invalid_type_error: 'A jogada deve ser um texto'
          })
          .regex(PLAY_FORMAT_REGEX, {
            message: 'Formato da jogada inválida'
          })
      })
    )
  })

  return validator(constraints, request.body, response, next)
}
