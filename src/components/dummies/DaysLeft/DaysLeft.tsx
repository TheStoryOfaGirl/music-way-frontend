import styles from './DaysLeft.module.css'
import {classnames, formatDaysLeft} from "@utils"

interface DaysLeftProps {
  countDays: string;
}

export const DaysLeft = ({countDays}: DaysLeftProps) => {
  return (
    <div className={styles.container}>
      <p className={classnames('text_24_b')}>{`${formatDaysLeft(countDays)}`}</p>
    </div>
  )
}