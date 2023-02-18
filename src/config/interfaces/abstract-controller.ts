import { Response } from 'express'

export abstract class AbstractController {
  protected async successResponse(
    response: Response,
    body: any,
    statusCode = 200
  ): Promise<Response> {
    return response.status(statusCode).send(body)
  }

  protected async failureResponse(response: Response, error: Error | any): Promise<Response> {
    const { message, statusCode, errors } = error
    return response.status(statusCode).send({
      message,
      errors
    })
  }
}
