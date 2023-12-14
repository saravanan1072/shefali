import React, { useCallback, useEffect, useState, useRef } from "react";
import { customizeEvent } from "../../utils";

const MultiRangeSlider = ({ min, max, onChange, name,minValue,maxValue,width}) => {
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minValue);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minValue, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxValue);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxValue, getPercent]);

  // Get min and max values when their state changes
  // useEffect(() => {
  //   onChange({ min: minVal, max: maxVal });
  // }, [minVal, maxVal]);

  return (
    <div className="range-container">
      <div className="flex justify-between">
        <div className="slider-left-value">{minValue}</div>
        <div className="slider-right-value">{maxValue}</div>
      </div>
      <div className="relative">
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxValue - 1);
          event.target.value = value.toString();
          customizeEvent(event, name, { min: value, max: maxValue });
          onChange(event);
        }}
        className="thumb"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxValue}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minValue + 1);
          event.target.value = value.toString();
          customizeEvent(event, name, { min: minValue, max: value });
          onChange(event);
        }}
        className="thumb"
      />
      </div>
      <div className="slider">
        <div className="slider-track" />
        <div ref={range} className="slider-range" />
      </div>
      <style jsx>{`
        .range-container {
          width: ${width};
          margin-bottom: 25px;
        }

        .slider {
          position: relative;
          width: 100%;
        }

        .slider-track,
        .slider-range {
          position: absolute;
          border-radius: 3px;
          height: 2px;
        }

        .slider-track {
          background-color: #cecece;
          width: 100%;
          z-index: 1;
        }

        .slider-range {
          background-color: #3dd6c4;
          z-index: 2;
        }

        .slider-left-value,
        .slider-right-value {
          color: #fff;
          background: #3dd6c4;
          font-size: 12px;
          padding: 2px 10px;
          margin-bottom: 5px;
          border-radius: 3px;
        }

        /* Removing the default appearance */
        .thumb,
        .thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
        }

        .thumb {
          pointer-events: none;
          position: absolute;
          height: 0;
          width:100%;
          outline: none;
        }

        /* For Chrome browsers */
        .thumb::-webkit-slider-thumb {
          background-color: #3dd6c4;
          border-radius: 50%;
          cursor: pointer;
          height: 15px;
          width: 15px;
          margin-top: 8px;
          pointer-events: all;
          position: relative;
        }

        /* For Firefox browsers */
        .thumb::-moz-range-thumb {
          background-color: #3dd6c4;
          border-radius: 50%;
          box-shadow: 0 0 1px 1px #ced4da;
          cursor: pointer;
          height: 15px;
          width: 15px;
          margin-top: 2px;
          pointer-events: all;
          position: relative;
        }
        @media screen and (max-width: 768px) {
          .range-container {
           width:100%;
          }
        }
      `}</style>
    </div>
  );
};

export default MultiRangeSlider;
