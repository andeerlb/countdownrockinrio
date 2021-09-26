import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import moment from 'moment'

import './CountDown.css';
import { calculateSVGPercentRadius, describeArc } from '../../utils/Utils';
import { useCountDown } from '../../context/CountDownContext';

const SVGCircle = ({ radius, stroke, colorCount, colorTotal }) => (
    <>
        <svg className='countdown-svg'>
            <path fill="none" stroke={colorCount} strokeWidth={stroke} d={describeArc(50, 50, 48, 0, radius)}/>
        </svg>
        {(radius === 0 || radius === 360)    && <svg className='countdown-svg'>
            <path fill="none" stroke="#dc2f02" strokeWidth={stroke} d={describeArc(50, 50, 48, 0, 359)}/>
        </svg>}
    </>
);

function CountDown({ timeTillDate="2022-09-02 00:00:00", timeFormat="YYYY-MM-DD HH:mm:ss", t }) {
    const { days, hours, minutes, seconds, setDays, setHours, setMinutes, setSeconds } = useCountDown();

    const stroke = 4;
    const colorBorderCount = "#000";

    let interval = setInterval(() => {
			const end = moment(timeTillDate, timeFormat).local();
			const current = moment(new Date());

            var duration = moment.duration(end.diff(current));

            setDays(duration.asDays().toFixed(0));
            setHours(duration.hours());
            setMinutes(duration.minutes());
            setSeconds(duration.seconds());

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