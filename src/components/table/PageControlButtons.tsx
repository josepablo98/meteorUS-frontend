import { PageControlButtonsProps } from "../../interfaces"

export const PageControlButtons = ({ numberPage, onNextPreviousPage }: PageControlButtonsProps) => {

  return (
    <div className="page-container">
      <button className="previous-page-btn" type="button" onClick={() => onNextPreviousPage(-1)}>&laquo;</button>
      <span className="page-number">{numberPage}</span>
      <button className="next-page-btn" type="button" onClick={() => onNextPreviousPage(1)}>&raquo;</button>
    </div>
  )
}
