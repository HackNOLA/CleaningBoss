import { ViewStyle, TextStyle, StyleProp, StyleSheet } from 'react-native'
import XDate from 'xdate'

import * as defaultStyle from './default'
import { DOT } from './dot'

export interface DotProps {
  theme?: Theme
  color?: string
  marked?: boolean
  selected?: boolean
  disabled?: boolean
  inactive?: boolean
  today?: boolean
}

export type ContextProp = {
  context?: CalendarContextProps
}
export type MarkingTypes = 'dot' | 'multi-dot' | 'period' | 'multi-period' | 'custom'
export type MarkedDates = {
  [key: string]: MarkingProps
}
export type DayState = 'selected' | 'disabled' | 'inactive' | 'today' | ''
export type Direction = 'left' | 'right'
export type DateData = {
  year: number
  month: number
  day: number
  timestamp: number
  dateString: string
}
export interface Theme {
  timelineContainer?: object
  contentStyle?: ViewStyle
  event?: object
  eventTitle?: object
  eventSummary?: object
  eventTimes?: object
  line?: object
  verticalLine?: object
  nowIndicatorLine?: object
  nowIndicatorKnob?: object
  timeLabel?: object
  todayTextColor?: string
  calendarBackground?: string
  indicatorColor?: string
  textSectionTitleColor?: string
  textSectionTitleDisabledColor?: string
  dayTextColor?: string
  selectedDayTextColor?: string
  monthTextColor?: string
  selectedDayBackgroundColor?: string
  arrowColor?: string
  textDisabledColor?: string
  textInactiveColor?: string
  backgroundColor?: string //TODO: remove in V2
  dotColor?: string
  selectedDotColor?: string
  disabledArrowColor?: string
  textDayFontFamily?: TextStyle['fontFamily']
  textMonthFontFamily?: TextStyle['fontFamily']
  textDayHeaderFontFamily?: TextStyle['fontFamily']
  textDayFontWeight?: TextStyle['fontWeight']
  textMonthFontWeight?: TextStyle['fontWeight']
  textDayHeaderFontWeight?: TextStyle['fontWeight']
  textDayFontSize?: number
  textMonthFontSize?: number
  textDayHeaderFontSize?: number
  agendaDayTextColor?: string
  agendaDayNumColor?: string
  agendaTodayColor?: string
  agendaKnobColor?: string
  todayButtonFontFamily?: TextStyle['fontFamily']
  todayButtonFontWeight?: TextStyle['fontWeight']
  todayButtonFontSize?: number
  textDayStyle?: TextStyle
  dotStyle?: object
  arrowStyle?: ViewStyle
  todayBackgroundColor?: string
  disabledDotColor?: string
  inactiveDotColor?: string
  todayDotColor?: string
  todayButtonTextColor?: string
  todayButtonPosition?: string
  arrowHeight?: number
  arrowWidth?: number
  weekVerticalMargin?: number
  stylesheet?: {
    calendar?: {
      main?: object
      header?: object
    }
    day?: {
      basic?: object
      period?: object
    }
    dot?: object
    marking?: object
    'calendar-list'?: {
      main?: object
    }
    agenda?: {
      main?: object
      list?: object
    }
    expandable?: {
      main?: object
    }
  }
}

type PERIOD = {
  color: string
  startingDay?: boolean
  endingDay?: boolean
}

export type AgendaEntry = {
  name: string
  height: number
  day: string
}

export type AgendaSchedule = {
  [date: string]: AgendaEntry[]
}

export interface DayAgenda {
  reservation?: AgendaEntry
  date?: XDate
}

type CustomStyle = {
  container?: ViewStyle
  text?: TextStyle
}

export interface MarkingProps extends DotProps {
  type?: MarkingTypes
  theme?: Theme
  selected?: boolean
  marked?: boolean
  today?: boolean
  disabled?: boolean
  inactive?: boolean
  disableTouchEvent?: boolean
  activeOpacity?: number
  textColor?: string
  selectedColor?: string
  selectedTextColor?: string
  customTextStyle?: StyleProp<TextStyle>
  customContainerStyle?: StyleProp<ViewStyle>
  dotColor?: string
  //multi-dot
  dots?: DOT[]
  //multi-period
  periods?: PERIOD[]
  startingDay?: boolean
  endingDay?: boolean
  accessibilityLabel?: string
  customStyles?: CustomStyle
}

export enum UpdateSources {
  CALENDAR_INIT = 'calendarInit',
  TODAY_PRESS = 'todayPress',
  LIST_DRAG = 'listDrag',
  DAY_PRESS = 'dayPress',
  PAGE_SCROLL = 'pageScroll',
  WEEK_SCROLL = 'weekScroll',
  PROP_UPDATE = 'propUpdate',
}

export interface CalendarContextProps {
  date: string
  prevDate: string
  setDate: (date: string, source: UpdateSources) => void
  updateSource: UpdateSources
  setDisabled: (disable: boolean) => void
  numberOfDays?: number
  timelineLeftInset?: number
}

export function styleConstructor(theme: Theme = {}) {
  const appStyle = { ...defaultStyle, ...theme }
  const { knob, weekdays } = platformStyles(appStyle)

  return StyleSheet.create({
    container: {
      flex: 1,
      overflow: 'hidden',
    },
    animatedContainer: {
      flex: 1,
    },
    knob,
    weekdays,
    header: {
      overflow: 'hidden',
      justifyContent: 'flex-end',
      position: 'absolute',
      height: '100%',
      width: '100%',
    },
    knobContainer: {
      flex: 1,
      position: 'absolute',
      left: 0,
      right: 0,
      height: 24,
      bottom: 0,
      alignItems: 'center',
      backgroundColor: appStyle.calendarBackground,
    },
    dayHeader: {
      width: 32,
      textAlign: 'center',
      fontSize: appStyle.textDayHeaderFontSize,
      fontFamily: appStyle.textDayHeaderFontFamily,
      fontWeight: appStyle.textDayHeaderFontWeight,
      color: appStyle.textSectionTitleColor,
    },
    reservations: {
      flex: 1,
      marginTop: 104,
      backgroundColor: appStyle.reservationsBackgroundColor || appStyle.backgroundColor, //TODO: remove 2nd in V2
    },
    scrollPadStyle: {
      position: 'absolute',
      width: '100%',
      alignSelf: 'center',
    },
    ...(theme['stylesheet.agenda.main'] || {}),
  })
}

export default function platformStyles(appStyle: Theme) {
  return {
    knob: {
      width: 38,
      height: 7,
      marginTop: 10,
      borderRadius: 3,
      backgroundColor: appStyle.agendaKnobColor,
    },
    weekdays: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 15,
      paddingBottom: 7,
      backgroundColor: appStyle.calendarBackground,
    },
  } as { [key: string]: ViewStyle }
}
