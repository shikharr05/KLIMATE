import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

import './forecast.css';
const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const Forecast = ({ data }) => {
  const dayInWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInWeek)
  );
  return (
    <>
      <label className="title">Daily Forecast:</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 6).map((item, idx) => (
          <AccordionItem key={idx}>
            {" "}
            {/* // React needs a key to uniquely identify each rendered component... more good way to do it <Accordian key = {item.dt}>... this .dt creates a unique timestamp and can be used even if the list is dynamic or there is changes in order of the list.... idx is generally used when the list is static and there are not changes.*/}
            <AccordionItemHeading>
              <AccordionItemButton> 
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_min)}°C /
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details">
                <div className="daily-details-item">
                  <label>Pressure:</label>
                  <label>{item.main.pressure}hPa</label>
                </div>
                <div className="daily-details-item">
                  <label>Humidity:</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="daily-details-item">
                  <label>Clouds:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-item">
                  <label>Speed:</label>
                  <label>{item.wind.speed}m/s</label>
                </div>
                <div className="daily-details-item">
                  <label>Feels like:</label>
                  <label>{Math.round(item.main.feels_like)}°C</label>
                </div>
                <div className="daily-details-item">
                  <label>Sea Level</label>
                  <label>{item.main.sea_level}m</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
export default Forecast;
