import { WebpayPlus } from 'transbank-sdk'
import { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk'

const tx = new WebpayPlus.Transaction(
    new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS, 
      IntegrationApiKeys.WEBPAY,
      Environment.Integration
    ))

export const pago = async (Amount: number, Url: string, ordenDeCompra: string, sessionID: string) =>{
    if (Amount && Url && ordenDeCompra && sessionID) {
        const amount: number = Amount
        const buyOrder: string = ordenDeCompra
        const returnUrl: string = `${Url}`
        const sessionId: string = sessionID
    
        const createResponse = await tx.create(buyOrder, sessionId, amount, returnUrl)

        const url: string = createResponse.url
        const token: string = createResponse.token
    
        return { url, token }
    } else{
        return { error: 'Faltan datos' }
    }
}