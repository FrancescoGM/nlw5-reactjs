import { format as dateFnsFormat } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const format = (
  date: Date | number,
  format: string,
  options?: {
    locale?: Locale
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    firstWeekContainsDate?: number
    useAdditionalWeekYearTokens?: boolean
    useAdditionalDayOfYearTokens?: boolean
  }
) => dateFnsFormat(date, format, { locale: ptBR, ...options })
