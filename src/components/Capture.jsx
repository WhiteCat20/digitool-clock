/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import moment from "moment";

export const Capture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [nama, setNama] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 1280,
            height: 720,
            facingMode: { exact: "environment" },
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    startCamera();

    // Clean up function to stop the camera when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
    const cam_name = JSON.parse(localStorage.getItem("nama"));
    const cam_area = JSON.parse(localStorage.getItem("area"));
    setNama(cam_name);
    setArea(cam_area);
  }, []);

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas dimensions to match the video resolution
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // canvas.width = 720
    // canvas.height = 1280

    // Draw the video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the overlay text elements
    const textElements = document.querySelectorAll("#overlay-text div");

    textElements.forEach((el, index) => {
      context.fillStyle = "rgba(255, 0, 0, 1)";
      // context.fillRect(16, 460 + (index * 40), 750, 40); // Background for text
      context.fillStyle = "white";
      context.strokeStyle = "black"; // Set the stroke color
      context.lineWidth = 3; // Set the stroke width
      context.font = "24px Arial";
      
      // Draw the stroke first
      context.strokeText(el.textContent, 16, 1000 + index * 30);
      // Then fill the text
      context.fillText(el.textContent, 16, 1000 + index * 30);
    });

    // Get the image data from the canvas
    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);

    // Create a link element to trigger download
    const link = document.createElement("a");
    link.href = imageData;
    link.download = `${nama} ${area} ${moment().format("DD/MM/YYYY HH:mm")}`;
    link.click();
  };

  return (
    <div>
      <div className="flex justify-center mt-[4%]">
        <div style={{ position: "relative", width: "840px" }}>
          <video ref={videoRef} autoPlay muted style={{ rotate:'90deg' }}></video>
          <div
            id="overlay-text"
            style={{
              position: "absolute",
              left: "10px",
              bottom: "20%",
              color: "white",
              padding: "5px",
            }}
          >
            <div>{nama}</div>
            <div>{area}</div>
            <div>{moment().format("DD/MM/YYYY")}</div>
            <div>{moment().format("HH:mm")} WIB</div>
            <div>
              {userLocation.latitude && userLocation.longitude
                ? `Lat: ${userLocation.latitude}, Lon: ${userLocation.longitude}`
                : "Fetching location..."}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-red-600 p-2 text-white mt-[20%]"
          onClick={captureImage}
        >
          Capture Image
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width="640"
        height="360"
        style={{ display: "none" }}
      ></canvas>
      {capturedImage && (
        <div>
          <h3>Captured Image:</h3>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
    </div>
  );
};
