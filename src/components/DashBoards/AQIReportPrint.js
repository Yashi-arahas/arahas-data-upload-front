import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AqiDashboard from "./AqiDashboard";
import AQIRecommendations from "./Recommendations/AQIRecommendations";

export default function AQIReportPrint({
  show,
  selectedLocation,
  startDate,
  endDate,
}) {
  const [visible, setVisible] = useState(false);
  const contentRef = useRef(null);
  const [aqiValue, setAqiValue] = useState(null);
  const [pm25Value, setPM25Value] = useState(null);
  const [pm10Value, setPM10Value] = useState(null);
  const handleAqiData = (data) => {
    setAqiValue(data.aqiValue);
    setPM25Value(data.pm25Value);
    setPM10Value(data.pm10Value);
  };
  

  const handlePrint = () => {
    window.print();
  };

  const handleExport = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -heightLeft, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const now = new Date();
      const dateStr = `${now.getDate()}/${
        now.getMonth() + 1
      }/${now.getFullYear()}`;
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

      pdf.setFontSize(10);
      pdf.text(
        `Generated on ${dateStr} at ${timeStr}`,
        10,
        pdf.internal.pageSize.height - 10
      );

      pdf.save("aqi_summary_report.pdf");
    }
  };

  return (
    <div className="flex justify-content-center">
      {show === true && (
        <Button
          label="Generate"
          icon="pi pi-file-pdf"
          size="small"
          onClick={() => setVisible(true)}
        />
      )}
      {show === false && (
        <Button label="Generate" icon="pi pi-file-pdf" size="small" disabled />
      )}

      <Dialog
        header=""
        visible={visible}
        className="m-4"
        onHide={() => setVisible(false)}
      >
        <div
          className="p-mb-4"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
        <div ref={contentRef} className="p-3 ">
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <h1 style={{ color: "#00a269" }}>City Sustainability Index 2024</h1>
            <h4>{selectedLocation}</h4>
            <h4>
              Ayodhya , Uttar Pradesh
            </h4>
            <h3 style={{ boder: "1px solid #00a269" }}>Nature (AQI Score) : 60 </h3>

            <div className="flex align-items-center justify-content-center flex-row">
              <p>
                Date Range: &nbsp;{startDate?.toLocaleDateString()}&nbsp; to{" "}
                {endDate?.toLocaleDateString()}
              </p>
            </div>
          </div>
          <div >
          <AqiDashboard onDataChange={handleAqiData}  show={false} pSelectedLocation={selectedLocation} pSelectedStartDate={startDate} pSelectedEndDate={endDate}/>
          </div>
          <div >
          <AQIRecommendations aqi={aqiValue} pm25={pm25Value} pm10={pm10Value}/>
          </div>

          
        </div>
        <div className="flex align-items-center justify-content-end p-2">
          <Button
            label="Print"
            icon="pi pi-print"
            size="small"
            className="p-button-secondary mr-2"
            onClick={handlePrint}
          />
          <Button
            label="Export as PDF"
            icon="pi pi-file-export"
            size="small"
            className="p-button-success"
            onClick={handleExport}
          />
        </div>
      </Dialog>
    </div>
  );
}
