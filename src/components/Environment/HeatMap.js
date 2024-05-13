import React from 'react';

const HeatMap = ({ data }) => {
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
            const entry = data.find(item => item.date === date && item.time === adjustedTime);
            return entry ? { date: date, time: time, value: entry.aqi } : null;
        });
        return rowData;
    });

    // Function to get color class based on AQI
    const getColorClass = (aqi) => {
        if (aqi >= 0 && aqi <= 50) {
            return "green-bg";
        } else if (aqi >= 51 && aqi <= 100) {
            return "yellow-bg";
        } else if (aqi >= 101 && aqi <= 200) {
            return "orange-bg";
        } else if (aqi >= 201 && aqi <= 300) {
            return "pink-bg";
        } else if (aqi >= 301 && aqi <= 400) {
            return "purple-bg";
        } else if (aqi >= 401) {
            return "red-bg";
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

export default HeatMap;
