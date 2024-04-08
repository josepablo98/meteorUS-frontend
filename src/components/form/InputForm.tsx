import { InputFormProps } from "../../interfaces"

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
          onBlur={fieldPropsBoard.onBlur}
          className="form-control"
          disabled={isBoardId}
          onChange={fieldPropsBoard.onChange}
          value={String(fieldPropsBoard.value)}
          name={fieldPropsBoard.name}
        />
        {(touched.boardId && errors.boardId) && <span>{errors.boardId}</span>}
      </div>

      <div className="form-group col-md-4">
        <label>Fecha de inicio:</label>
        <input
          type="date"
          className="form-control"
          onBlur={fieldPropsStartDate.onBlur}
          disabled={isDate}
          onChange={fieldPropsStartDate.onChange}
          value={String(fieldPropsStartDate.value)}
          name={fieldPropsStartDate.name}
        />
        {(touched.startDate && errors.startDate) && <span>{String(errors.startDate)}</span>}
      </div>

      <div className="form-group col-md-4">
        <label>Fecha de fin:</label>
        <input
          type="date"
          className="form-control"
          disabled={isDate}
          onBlur={fieldPropsEndDate.onBlur}
          onChange={fieldPropsEndDate.onChange}
          value={String(fieldPropsEndDate.value)}
          name={fieldPropsEndDate.name}
        />
        {(touched.endDate && errors.endDate) && <span>{String(errors.endDate)}</span>}
      </div>
    </div>
  )
}
