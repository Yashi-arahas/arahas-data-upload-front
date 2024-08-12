import React from 'react';

const HeatMap = ({ data }) => {
    console.log(data);
    
    // Extract unique dates
    const dates = [...new Set(data.map(entry => entry.date))].reverse();
    
    // Generate time slots from 00:30:00 to 23:30:00
    const timeSlots = Array.from({ length: 24 }, (_, index) => {
        const hours = index < 10 ? `0${index}` : `${index}`;
        return `${hours}:30:00`;
    });

    // Prepare data for heatmap
    const heatmapData = dates.map(date => {
        const rowData = timeSlots.map(time => {
            const entry = data.find(item => item.date === date && item.time === time);
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

    // Function to format time for display
    const formatTime = (time) => {
        // Expecting time in 'hh:mm:ss' format
        return time.slice(0, 5);
    };

    return (
        <div>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Date</th>
                        {timeSlots.map((time, index) => (
                            <th key={index}>{formatTime(time)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {heatmapData.map((rowData, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{dates[rowIndex]}</td>
                            {rowData.map((entry, colIndex) => (
                                <td key={colIndex} className={entry ? getColorClass(entry.value) : ''}>
                                    {entry ? entry.value : '-'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HeatMap;
