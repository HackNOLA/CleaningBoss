import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import Badge from '@mui/material/Badge'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton'

function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth()
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth))
      console.log('daysToHighlight', daysToHighlight)
      resolve({ daysToHighlight })
    }, 500)

    signal.onabort = () => {
      clearTimeout(timeout)
      reject(new DOMException('aborted', 'AbortError'))
    }
  })
}

// set to now
const initialValue = dayjs()

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props

  const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      color="info"
      variant={isSelected ? 'dot' : undefined}
      badgeContent={isSelected ? '' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  )
}

export default function DateCalendarServerRequest({ shifts }) {
  const requestAbortController = React.useRef<AbortController | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [highlightedDays, setHighlightedDays] = React.useState([])

  const fetchHighlightedDays = (highlightedDays) => {
    console.log('daysToHighlight', highlightedDays)
    setHighlightedDays(highlightedDays)
    setIsLoading(false)
  }

  React.useEffect(() => {
    if (!shifts) return
    if (!shifts.length) return
    // console.log('shifts', dayjs(shifts[0].start_date))
    // console.log('initialValue', initialValue)
    const highlightedDays = shifts.map((shift) => dayjs(shift.start_date).date())
    fetchHighlightedDays(highlightedDays)
    //
    console.log('highlightedDays', highlightedDays)
    // abort request on unmount
    return () => requestAbortController.current?.abort()
  }, [shifts])

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort()
    }

    setIsLoading(true)
    setHighlightedDays([])
    fetchHighlightedDays(date)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          } as any,
        }}
      />
    </LocalizationProvider>
  )
}
