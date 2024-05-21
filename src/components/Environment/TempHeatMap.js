import React from 'react';

const TempHeatMap = ({ data }) => {
    // Extract unique dates
    const dates = [...new Set(data.map(entry => entry.date))].reverse();
    
    
    // Generate time slots from 00:30 to 23:30
    const timeSlots = Array.from({length: 24}, (_, index) => {
        const hours = index < 10 ? `0${index}` : `${index}`;
        return `${hours}:30`;
    });

    // Prepare data for heatmap
    const heatmapData = dates.map(date => {
        const rowData = timeSlots.map(time => {
            // Adjust the time format for the data fetching
            const adjustedTime = time.charAt(0) === '0' ? time.substring(1) : time;
            const entry = data.find(item => item.date === date && item.time === time);
            return entry ? { date: date, time: time, value: entry.temp.toFixed(2) } : null;
        });
        return rowData;
    });

    // Function to get color class based on AQI
    const getColorClass = (aqi) => {
        if (aqi >= 0 && aqi <= 10) {
            return "shade-1";
        } else if (aqi >= 11 && aqi <20) {
            return "shade-2";
        } else if (aqi >= 20 && aqi < 30) {
            return "shade-3";
        } else if (aqi >= 30 && aqi <40) {
            return "shade-4";
        } else if (aqi >= 40 && aqi < 50) {
            return "shade-5";
        } else if (aqi >= 50) {
            return "shade-6";
        } else {
            return "";
        }
    };
    

    return (
        <div>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Date</th>
                        {timeSlots.map((time, index) => (
                            <th key={index}>{time<0 ? "0" +time : time}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {heatmapData.map((rowData, index) => (
                        <tr key={index}>
                            <td>{dates[index]}</td>
                            {rowData.map((entry, index) => (
                                <td key={index} className={entry ? getColorClass(entry.value) : ''}>{entry ? entry.value : '-'}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TempHeatMap;
