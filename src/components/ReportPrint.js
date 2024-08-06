import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Admin.css";

export default function ReportPrint({
  show,
  startDate,
  endDate,
}) {
  const [visible, setVisible] = useState(false);
  const contentRef = useRef(null);

  // Sample data for the DataTable
  const products = [
    {
      nature: "Air Quality",
      natureScore: "12/20",
      society: "City Planning",
      societyScore: "18/25",
      administration: "Transparency & Accountability",
      administrationScore: "21/30",
    },
    {
      nature: "Water Conservation & Preservation",
      natureScore: "4.5/15",
      society: "Basic Services",
      societyScore: "17/25",
      administration: "Ethical Leadership",
      administrationScore: "18/30",
    },
    {
      nature: "Land Usage",
      natureScore: "8/10",
      society: "Cultural Preservation",
      societyScore: "15/25",
      administration: "Disaster Management",
      administrationScore: "33/40",
    },
    {
      nature: "Waste Management",
      natureScore: "3/10",
      society: "Holistic Well Being",
      societyScore: "18/25",
      administration: "",
      administrationScore: "",
    },
    {
      nature: "Green Coverage",
      natureScore: "11.25/15",
      society: "",
      societyScore: "",
      administration: "",
      administrationScore: "",
    },
    {
      nature: "Fire & Energy",
      natureScore: "10/10",
      society: "",
      societyScore: "",
      administration: "",
      administrationScore: "",
    },
    {
      nature: "GHG Emissions",
      natureScore: "9/10",
      society: "",
      societyScore: "",
      administration: "",
      administrationScore: "",
    },
  ];

  const isLowScore = (value) => {
    const [score, max] = value.split("/").map(parseFloat);
    return score < max * 0.7;
  };

  const cellClassName = (score) => (isLowScore(score) ? "low-score" : "");

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

      pdf.save("summary_report.pdf");
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
        style={{ width: "80vw" }}
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
            <h4>
              Ayodhya , Uttar Pradesh
            </h4>
            <h3 style={{ boder: "1px solid #00a269" }}>CSI Score: 75</h3>

            <div className="flex align-items-center justify-content-center flex-row">
              <p>
                Date Range: &nbsp;{startDate?.toLocaleDateString()}&nbsp; to{" "}
                {endDate?.toLocaleDateString()}
              </p>
            </div>
          </div>
          <DataTable value={products} tableStyle={{ minWidth: "40rem" }}>
            <Column
              field="nature"
              header="Nature"
              className="bg-green-200"
              bodyClassName={(rowData) => cellClassName(rowData.natureScore)}
              headerStyle={{ backgroundColor: "#987D9A", color: "white" }}
            />
            <Column
              field="natureScore"
              header="60.81"
              className="bg-green-100"
              bodyClassName={(rowData) => cellClassName(rowData.natureScore)}
              headerStyle={{ backgroundColor: "#BB9AB1", color: "white" }}
            />
            <Column
              field="society"
              header="Society"
              className="bg-blue-200"
              bodyClassName={(rowData) => cellClassName(rowData.societyScore)}
              headerStyle={{ backgroundColor: "#987D9A", color: "white" }}
            />
            <Column
              field="societyScore"
              header="70"
              className="bg-blue-100"
              bodyClassName={(rowData) => cellClassName(rowData.societyScore)}
              headerStyle={{ backgroundColor: "#BB9AB1", color: "white" }}
            />
            <Column
              field="administration"
              header="Administration"
              className="bg-pink-200"
              bodyClassName={(rowData) =>
                cellClassName(rowData.administrationScore)
              }
              headerStyle={{ backgroundColor: "#987D9A", color: "white" }}
            />
            <Column
              field="administrationScore"
              header="60"
              className="bg-pink-100"
              bodyClassName={(rowData) =>
                cellClassName(rowData.administrationScore)
              }
              headerStyle={{ backgroundColor: "#BB9AB1", color: "white" }}
            />
          </DataTable>
          <div className="p-mt-4 text-sm">
            <h4>Recommendations:</h4>
            <ul>
              <li>
                Extremely high levels of PM2.5 and PM10 were recorded in areas
                like Ranopali Kila Road and near the airport in Ayodhya on
                January 29, 2024. These levels exceeded 900 for PM2.5 and
                touched 1000 for PM10, indicating an "extremely hazardous" air
                quality condition. Limit outdoor activities as much as possible,
                especially for sensitive groups like children and elderly. Such
                concentrations of particulate matter pose immediate health risks
                to vulnerable group exacerbating respiratory conditions such as
                asthma and bronchitis.
              </li>
              <li>
                Invest in alternative water sources such as rainwater
                harvesting, desalination, and wastewater recycling. Implement
                stringent regulations to prevent industrial, agricultural, and
                domestic pollution of water sources.
              </li>
              <li>
                Develop a Digital Waste Tracking System. Maintain a current
                inventory of hazardous materials employed within work areas.
              </li>
            </ul>
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
