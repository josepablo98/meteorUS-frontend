import { InputFormProps } from "../../interfaces"
import { ErrorForm } from "./ErrorForm";

export const InputForm = ({ errors, getFieldProps, isBoardId, isDate, touched }: InputFormProps) => {
  const fieldPropsBoard = getFieldProps("boardId");
  const fieldPropsStartDate = getFieldProps("startDate");
  const fieldPropsEndDate = getFieldProps("endDate");
  return (
    <div className="row">
      <div className="form-group col-md-4">
        <label>BoardId:</label>

        <input
          type="number"
          placeholder="Placa"
          className="form-control"
          disabled={isBoardId}
          onChange={fieldPropsBoard.onChange}
          onBlur={fieldPropsBoard.onBlur}
          value={String(fieldPropsBoard.value)}
          name={fieldPropsBoard.name}
          style={{ borderColor: (errors.boardId && touched.boardId && !isBoardId) ? "red" : "", borderWidth: (errors.boardId && !isBoardId) ? "2px" : ""}}
        />
        {(touched.boardId && errors.boardId && !isBoardId) && <ErrorForm error={errors.boardId}/>}
      </div>

      <div className="form-group col-md-4">
        <label>Fecha de inicio:</label>
        <input
          type="date"
          className="form-control"
          disabled={isDate}
          onChange={fieldPropsStartDate.onChange}
          onBlur={fieldPropsStartDate.onBlur}
          value={String(fieldPropsStartDate.value)}
          name={fieldPropsStartDate.name}
          style={{ borderColor: (errors.startDate && touched.startDate && !isDate) ? "red" : "", borderWidth: (errors.startDate && !isDate) ? "2px" : ""}}
        />
        {(touched.startDate && errors.startDate && !isDate) && <ErrorForm error={String(errors.startDate)}/>}
      </div>

      <div className="form-group col-md-4">
        <label>Fecha de fin:</label>
        <input
          type="date"
          className="form-control"
          disabled={isDate}
          onChange={fieldPropsEndDate.onChange}
          onBlur={fieldPropsEndDate.onBlur}
          value={String(fieldPropsEndDate.value)}
          name={fieldPropsEndDate.name}
          style={{ borderColor: (errors.endDate && !isDate) ? "red" : "", borderWidth: (errors.endDate && !isDate) ? "2px" : ""}}
        />
        {(touched.endDate && errors.endDate && !isDate) && <ErrorForm error={String(errors.endDate)}/>}
      </div>
    </div>
  )
}
