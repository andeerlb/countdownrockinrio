import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import moment from 'moment'

import './CountDown.css';

const SVGCircle = ({ radius, stroke, colorCount, colorTotal }) => (
    <>
        {/* <svg className='countdown-svg' style={{ opacity: ".2" }}>
            <path fill="none" stroke={colorTotal} strokeWidth={stroke} d={describeArc(50, 50, 48, 0, 359)}/>
        </svg> */}
        <svg className='countdown-svg'>
            <path fill="none" stroke={colorCount} strokeWidth={stroke} d={describeArc(50, 50, 48, 0, radius)}/>
        </svg>
        {(radius === 0 || radius === 360)    && <svg className='countdown-svg'>
            <path fill="none" stroke="#dc2f02" strokeWidth={stroke} d={describeArc(50, 50, 48, 0, 359)}/>
        </svg>}
    </>
);

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function calculateSVGPercentRadius(qtd, total) {
    let totalPercent = ((total - qtd) * 100) / total;
    let radius = (360 * totalPercent) / 100;
    return radius;
}

function CountDown({ timeTillDate="2022-09-02 00:00:00", timeFormat="YYYY-MM-DD HH:mm:ss", t }) {

    const [days,setDays] = useState(0);
    const [hours,setHours] = useState(0);
    const [minutes,setMinutes] = useState(0);
    const [seconds,setSeconds] = useState (0);

    const stroke = 4;
    const colorBorderFinally = "#ddd";
    const colorBorderCount = "#000";

    let interval = setInterval(() => {
			const end = moment(timeTillDate, timeFormat).local();
			const current = moment(new Date());

            var duration = moment.duration(end.diff(current));
            var days = duration.asDays().toFixed(0);
            var hours = duration.hours();
            var minutes = duration.minutes();
            var seconds = duration.seconds();

			setDays(days)
            setHours(hours)
            setMinutes(minutes)
            setSeconds(seconds)
		}, 1000);

    useEffect(() => {
        return () => {
            clearInterval(interval);
        }
    })
    
    const daysRadius = calculateSVGPercentRadius(days, 346);
    const hoursRadius = calculateSVGPercentRadius(hours, 24);
    const minutesRadius = calculateSVGPercentRadius(minutes, 60);
    const secondsRadius = calculateSVGPercentRadius(seconds, 60);

    return (
        <div>
            <div className='countdown-wrapper'>
                <h1 className="countdown-title">{t('ROCK_IN_RIO_COUNTDOWN')}</h1>
                <div className="countdown-item-wrapper">
                    <div className='countdown-item bg-days'>
                        <SVGCircle stroke={stroke} radius={daysRadius} colorCount={colorBorderCount}/>
                        {days} 
                        <span>{t('DAYS')}</span>
                    </div>
                    <div className='countdown-item bg-hours'>							
                        <SVGCircle stroke={stroke} radius={hoursRadius} colorCount={colorBorderCount}/>
                        {hours} 
                        <span>{t('HOURS')}</span>
                    </div>
                    <div className='countdown-item bg-minutes'>
                        <SVGCircle stroke={stroke} radius={minutesRadius} colorCount={colorBorderCount}/>
                        {minutes} 
                        <span>{t('MINUTES')}</span>
                    </div>
                    <div className='countdown-item bg-seconds' >
                        <SVGCircle stroke={stroke} radius={secondsRadius} colorCount={colorBorderCount}/>
                        {seconds} 
                        <span>{t('SECONDS')}</span>
                    </div>
                </div>
                <h1 className="countdown-subtitle">{t('ROCK_IN_RIO_COUNTDOWN_SUBTITLE')}</h1>
            </div>
        </div>
    )
}

export default withTranslation()(CountDown);