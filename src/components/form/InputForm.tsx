import { InputFormProps } from "../../interfaces"

export const InputForm = ({ boardId, isBoardId, isDate, onDateChange, onInputChange, startDate, endDate }: InputFormProps) => {

  return (
    <div className="row">
      <div className="form-group col-md-4">
        <label>BoardId:</label>
        <input
          type="number"
          value={boardId}
          name="boardId"
          placeholder="BoardId"
          className="form-control"
          onChange={onInputChange}
          disabled={isBoardId}
        />
      </div>

      <div className="form-group col-md-4">
        <label>Fecha de inicio:</label>
        <input
          type="date"
          name="startDate"
          className="form-control"
          onChange={onDateChange}
          value={startDate.toString()}
          disabled={isDate}
        />
      </div>

      <div className="form-group col-md-4">
        <label>Fecha de fin:</label>
        <input
          type="date"
          name="endDate"
          className="form-control"
          onChange={onDateChange}
          value={endDate.toString()}
          disabled={isDate}
        />
      </div>
    </div>
  )
}
