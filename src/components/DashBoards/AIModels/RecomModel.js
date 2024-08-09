// import React, { useState, useEffect } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import ai_model from "../../../../public/model/model.json"
 
// const RecomModel= () => {
//   const [model, setModel] = useState(null);
//   const [prediction, setPrediction] = useState(null);
 
//   // Load the model when the component mounts
//   useEffect(() => {
//     const loadModel = async () => {
//       const model = await tf.loadLayersModel({ai_model});
//       console.log(model)
//       setModel(model);
//     };
//     loadModel();
//   }, []);
 
//   const predict = async (input) => {
//     if (model) {
//       const tensor = tf.tensor([input]);
//       const output = model.predict(tensor);
//       const predictionArray = await output.array();
//       setPrediction(predictionArray);
//     }
//   };
 
//   return (
// <div>
// <h1>Model Prediction</h1>
// <button onClick={() => predict([0.5])}>Make Prediction</button>
//       {prediction && <pre>{JSON.stringify(prediction, null, 2)}</pre>}
// </div>
//   );
// };
 
// export default RecomModel;