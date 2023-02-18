import { Response as IResponse } from 'express'
import { Injectable } from '@decorators/di'
import { Body, Controller, Post, Response } from '@decorators/express'

import { IMatchInput } from '@/app/entities/match.entity'
import { MatchUsecase } from '@/app/usecases/match.usecase'
import { AbstractController } from '@/config/interfaces/abstract-controller'
import { matchValidator } from '@/app/controllers/validator/match.validator'

@Controller('/matches')
@Injectable()
export class MatchController extends AbstractController {
  constructor(private readonly usecase: MatchUsecase) {
    super()
  }
  @Post('/roll', [matchValidator])
  async getResultMatch(@Body() body: IMatchInput, @Response() response: IResponse): Promise<void> {
    try {
      const payload = await this.usecase.getResultMatch(body)
      await this.successResponse(response, payload, 200)
    } catch (e: Error | any) {
      await this.failureResponse(response, e)
    }
  }
}
