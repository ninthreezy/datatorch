import pino from 'pino'
import * as Config from './config'

export const logger = pino({ prettyPrint: Config.IS_DEV })
