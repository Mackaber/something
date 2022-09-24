import * as tf from "@tensorflow/tfjs";
// import  { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import React from "react";

export function useTensorFlowModel(modelKind) {
  const [model, setModel] = React.useState(null);

  const isMounted = React.useRef(true);

  React.useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  React.useEffect(() => {
    setModel(null);
    console.log("Loading model...");

    //const modelJSON = require("../assets/model.json");
    //const modelWeights = require("../assets/weights.bin");

    modelKind.load()
    //tf.loadLayersModel(bundleResourceIO(modelJSON, modelWeights))
    //tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/iris_v1/model.json')
    .then((model) => {
      if (isMounted.current) {
        setModel(model);
      }
      console.log("Model loaded!");
    }).catch(e => {
      console.log(e);
    });
  }, [modelKind]);

  return model;
}

export function useTensorFlowLoaded() {
  const [isLoaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    tf.ready().then(() => {
      if (isMounted) {
        setLoaded(true);
      }
    });
    return () => (isMounted = false);
  }, []);

  return isLoaded;
}
