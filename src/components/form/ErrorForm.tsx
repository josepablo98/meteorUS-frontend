import { ErrorProps } from "../../interfaces"

export const ErrorForm = ({error} : ErrorProps) => {
  return (
    <>
      <span>{error}</span>
    </>
  )
}
