import { useEffect, useState } from "react";
import { getActuator, getBoard, getPressure, getTempHum } from "../../helpers";
import { DataProps, PageControlButtonsProps } from "../../interfaces";
import { CircleLoader } from "react-spinners";

export const PageControlButtons = ({ numberPage, onNextPreviousPage, finalActuatorFilterValue, finalFilterValue, finalRegisterValue, boardId, data, endDate, startDate, isNextPage }: PageControlButtonsProps) => {
  const previousPageDisabled = numberPage === 1;
  const [isNextPageDisabled, setIsNextPageDisabled] = useState(false);
  const [isCheckingNextPage, setIsCheckingNextPage] = useState(false);

  useEffect(() => {
    const lastPageDisabled = async () => {
      setIsCheckingNextPage(true);
      let response: DataProps = [];
      switch (finalRegisterValue) {
        case "Registros de placas":
          response = await getBoard({ boardId, data, endDate, filter: finalFilterValue, startDate, numberPage: numberPage + 1, isFormButtons: true });
          break;
        case "Registros de temperaturas y humedad":
          response = await getTempHum({ boardId, data, endDate, filter: finalFilterValue, startDate, numberPage: numberPage + 1, isFormButtons: true });
          break;
        case "Registros de presion y altitud":
          response = await getPressure({ boardId, data, endDate, filter: finalFilterValue, startDate, numberPage: numberPage + 1, isFormButtons: true });
          break;
        case "Registros de actuadores":
          response = await getActuator({ boardId, data, endDate, filter: finalFilterValue, startDate, numberPage: numberPage + 1, actuatorFilter: finalActuatorFilterValue, isFormButtons: true });
          break;
        default:
          break;
      }
      setIsNextPageDisabled(response.length === 0 && !isNextPage);
      setIsCheckingNextPage(false);
    };

    lastPageDisabled();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberPage, finalRegisterValue, finalFilterValue, finalActuatorFilterValue, boardId, data, endDate, startDate, isNextPage]);

  return (
    <div className="page-container">
      <button
        className="previous-page-btn"
        style={{ backgroundColor: previousPageDisabled ? "grey" : "", cursor: previousPageDisabled ? "default" : "pointer" }}
        type="button"
        onClick={() => onNextPreviousPage(-1)}
        disabled={previousPageDisabled}
      >
        &laquo;
      </button>

      {
        isCheckingNextPage
          ? <CircleLoader size={20} color={"#36D7B7"} loading={true} />
          : <span className="page-number">{numberPage}</span>
      }

      <button
        className="next-page-btn"
        style={{ backgroundColor: isNextPageDisabled ? "grey" : "", cursor: isNextPageDisabled ? "default" : "pointer" }}
        type="button"
        onClick={() => onNextPreviousPage(1)}
        disabled={isNextPageDisabled}
      >
        &raquo;
      </button>

    </div>
  );
};
