import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";

export default function FeedbackForm() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="flex justify-content-center">
      <Button
        label="Feedback/Suggestions"
        icon="pi pi-pen-to-square"
        size="small"
        className="mr-3"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Feedback/Suggestions"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <p className="m-1">Please take a moment to share your feedback.</p>
        <InputTextarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={5}
          cols={30}
          placeholder="Type your feedback here..."
          className="w-full h-10rem mt-3"
        />
        <div className="flex justify-content-center mt-4">
          <Button
            label="Submit"
            icon="pi pi-check"
            onClick={() => {
              console.log("Feedback submitted:", value);
              setVisible(false);
            }}
            style={{ backgroundColor: "#00a269", color: "white" }}
          />
        </div>
      </Dialog>
    </div>
  );
}
