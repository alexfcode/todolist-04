type Props = {
  title: string
  onClick?: () => void
  buttonClassName?: string
}

export const Button = ({ title, onClick, buttonClassName="" }: Props) => {
  return <button className={buttonClassName} onClick={onClick}>{title}</button>
}
