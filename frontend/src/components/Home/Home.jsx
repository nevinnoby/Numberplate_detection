import React, { useState, useRef, useEffect } from 'react';
import '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [cameraOn, setCameraOn] = useState(false);
  const [model, setModel] = useState(null);
  const [detections, setDetections] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const openCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        setCameraOn(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
          };
        }
      })
      .catch(error => {
        console.error('Error accessing camera: ', error);
      });
  };

  const loadModel = async () => {
    const loadedModel = await cocoSsd.load();
    setModel(loadedModel);
  };

  const detectObjects = async () => {
    if (model && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Ensure video dimensions are available
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.error('Video dimensions are not available.');
        return;
      }
  
      // Set canvas dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
  
      // Perform object detection
      const predictions = await model.detect(video);
      setDetections(predictions);
  
      // Clear the canvas and draw detections
      context.clearRect(0, 0, canvas.width, canvas.height);
      predictions.forEach(prediction => {
        // Filter detections based on class or any other criteria
        // For COCO-SSD, it's not specifically for number plates
        if (prediction.class === 'car' || prediction.class === 'bus') {
          context.beginPath();
          context.rect(...prediction.bbox);
          context.lineWidth = 2;
          context.strokeStyle = 'red';
          context.fillStyle = 'red';
          context.stroke();
          context.fillText(`${prediction.class} (${Math.round(prediction.score * 100)}%)`, prediction.bbox[0], prediction.bbox[1] > 10 ? prediction.bbox[1] - 10 : 10);
        }
      });
    } else {
      console.error('Model, video, or canvas is not available.');
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      detectObjects();
    }, 1000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [model]);

  return (
    <div className='hbody'>
      <div className="app">
        <button className="detect-btn" onClick={openCamera}>
          <span className="icon">🚗</span> Start Camera
        </button>

        {cameraOn && (
          <div className="camera-container">
            <video ref={videoRef} autoPlay className="camera-feed" />
            <canvas ref={canvasRef} className="canvas-overlay" />
          </div>
        )}

        <div className="result">
          <h2>Detected Objects:</h2>
          <ul>
            {detections.map((detection, index) => (
              <li key={index}>
                {detection.class} ({Math.round(detection.score * 100)}%)
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
