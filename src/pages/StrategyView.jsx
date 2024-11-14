import { dateArray, strategyArray } from "data/data";
import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

const StrategyView = () => {
  const [selectedView, setSelectedView] = useState("Bullish");
  const [selectedDate, setSelectedDate] = useState(dateArray[0]);
  const [isOpen, setIsOpen] = useState(false);

  const availableViews = ["Bullish", "Bearish", "RangeBound", "Volatile"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  // const handleDateChange = (event) => {
  //   setSelectedDate(event.target.value);
  // };

  const handleViewChange = (view) => {
    setSelectedView(view);
    setSelectedDate(dateArray[0]);
  };

  const getStrategiesForSelectedDate = () => {
    const strategies = strategyArray.find((item) => item.View === selectedView)
      ?.Value[selectedDate];
    if (strategies) {
      const strategyCountMap = strategies.reduce((acc, strategy) => {
        acc[strategy] = (acc[strategy] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(strategyCountMap).map(([strategy, count]) => ({
        name: strategy,
        count: count,
      }));
    }
    return [];
  };

  const strategies = getStrategiesForSelectedDate();

  return (
    <div className="container w-100 mx-auto" style={{ marginTop: 100 }}>
      {/* Toggle */}
      <div
        className="d-flex align-items-center w-100 btn-containter"
        style={{ marginBottom: 16 }}
      >
        {availableViews.map((view) => (
          <button
            key={view}
            onClick={() => handleViewChange(view)}
            className={`w-100 btn cursor-pointer ${
              selectedView === view ? "bg-primary text-white" : ""
            }`}
            style={{ fontWeight: selectedView === view ? "bold" : "normal" }}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Date Dropdown */}
      {/* <select value={selectedDate} onChange={handleDateChange} className="dropdown w-100">
        {dateArray.map((date) => (<option key={date} value={date}> {date} </option>))} 
        </select> */}

      <div className="position-relative" style={{ marginBottom: 24 }}>
        <div className="dropdown-item w-100" onClick={toggleDropdown}>
          <p className="text-bold">{selectedDate}</p>
          <div>
            {isOpen ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
          </div>
        </div>
        {isOpen && (
          <div className="" style={{ padding: "0 24px" }}>
            {dateArray
              .filter((date) => date !== selectedDate)
              .map((date) => (
                <div
                  key={date}
                  className="dropdown-item w-100"
                  onClick={() => handleDateSelect(date)}
                >
                  <h4 className="text-bold">{date}</h4>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Strategy Cards */}
      <div className="w-100">
        {strategies.length > 0 ? (
          strategies.map(({ name, count }) => (
            <div
              key={name}
              className="d-flex justify-content-between strategy-card w-100"
            >
              <h4>{name}</h4>
              <p className="text-grey" style={{ fontWeight: 500 }}>
                <GoDotFill size={12} color="#b6b6b6" /> {count}{" "}
                {count > 1 ? "Strategies" : "Strategy"}
              </p>
            </div>
          ))
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: 240 }}
          >
            <div className="text-center">
              <p>There are no strategies for</p>
              <p className="text-bold">{selectedDate}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrategyView;
