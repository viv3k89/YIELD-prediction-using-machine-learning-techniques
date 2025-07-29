document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const openCameraBtn = document.getElementById('open-camera-btn');
    const closeCameraBtn = document.getElementById('close-camera-btn');
    const captureBtn = document.getElementById('capture-btn');
    const fileInput = document.getElementById('file-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const newAnalysisBtn = document.getElementById('new-analysis-btn');
    
    const cameraContainer = document.getElementById('camera-container');
    const previewContainer = document.getElementById('preview-container');
    const resultsContainer = document.getElementById('results-container');
    const optionsContainer = document.querySelector('.options-container');
    
    const cameraView = document.getElementById('camera-view');
    const previewImage = document.getElementById('preview-image');
    const resultImage = document.getElementById('result-image');
    
    const diagnosis = document.getElementById('diagnosis');
    const confidenceLevel = document.getElementById('confidence-level');
    const confidencePercentage = document.getElementById('confidence-percentage');
    const recommendations = document.getElementById('recommendations');
    
    let stream = null;
    let capturedImage = null;
    
    // Camera functionality
    openCameraBtn.addEventListener('click', async function() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 } 
                } 
            });
            cameraView.srcObject = stream;
            
            optionsContainer.hidden = true;
            cameraContainer.hidden = false;
        } catch (err) {
            alert('Error accessing camera: ' + err.message);
            console.error('Error accessing camera:', err);
        }
    });
    
    closeCameraBtn.addEventListener('click', function() {
        stopCamera();
        cameraContainer.hidden = true;
        optionsContainer.hidden = false;
    });
    
    captureBtn.addEventListener('click', function() {
        // Create a canvas element to capture the current video frame
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        // Set canvas dimensions to match the video
        canvas.width = cameraView.videoWidth;
        canvas.height = cameraView.videoHeight;
        
        // Draw the current video frame on the canvas
        context.drawImage(cameraView, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL
        capturedImage = canvas.toDataURL('image/jpeg');
        
        // Display the captured image in preview
        previewImage.src = capturedImage;
        resultImage.src = capturedImage;
        
        // Stop the camera stream
        stopCamera();
        
        // Show preview container
        cameraContainer.hidden = true;
        previewContainer.hidden = false;
    });
    
    // File upload functionality
    fileInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                capturedImage = event.target.result;
                previewImage.src = capturedImage;
                resultImage.src = capturedImage;
                
                optionsContainer.hidden = true;
                previewContainer.hidden = false;
            };
            
            reader.readAsDataURL(e.target.files[0]);
        }
    });
    
    // Preview actions
    analyzeBtn.addEventListener('click', function() {
        // In a real application, this is where you would send the image to a server
        // for analysis with a machine learning model. For this demo, we'll simulate
        // a prediction with random results.
        simulatePrediction();
        
        previewContainer.hidden = true;
        resultsContainer.hidden = false;
    });
    
    cancelBtn.addEventListener('click', function() {
        previewContainer.hidden = true;
        optionsContainer.hidden = false;
        capturedImage = null;
    });
    
    // Results actions
    newAnalysisBtn.addEventListener('click', function() {
        resultsContainer.hidden = true;
        optionsContainer.hidden = false;
        capturedImage = null;
    });
    
    // Helper functions
    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
    }
    
    function simulatePrediction() {
        // This is a simulation of disease prediction
        // In a real application, this would be replaced with actual ML model predictions
        
        const diseases = [
            {
                name: "Healthy",
                confidence: 95,
                recommendations: [
                    "Your crop appears to be healthy",
                    "Continue with regular maintenance",
                    "Monitor for any changes in appearance"
                ]
            },
            {
                name: "Leaf Blight",
                confidence: 87,
                recommendations: [
                    "Apply fungicide treatment",
                    "Remove and destroy infected leaves",
                    "Improve air circulation around plants",
                    "Avoid overhead watering"
                ]
            },
            {
                name: "Powdery Mildew",
                confidence: 78,
                recommendations: [
                    "Apply sulfur-based fungicide",
                    "Increase spacing between plants",
                    "Water at the base of plants",
                    "Remove severely infected leaves"
                ]
            },
            {
                name: "Rust",
                confidence: 82,
                recommendations: [
                    "Apply appropriate fungicide",
                    "Remove infected plant material",
                    "Avoid wetting the foliage when watering",
                    "Ensure good air circulation"
                ]
            }
        ];
        
        // Randomly select a disease (for demo purposes)
        const randomIndex = Math.floor(Math.random() * diseases.length);
        const prediction = diseases[randomIndex];
        
        // Update the UI with the prediction
        diagnosis.textContent = prediction.name;
        confidenceLevel.style.width = prediction.confidence + '%';
        confidencePercentage.textContent = prediction.confidence + '%';
        
        // Clear previous recommendations
        recommendations.innerHTML = '';
        
        // Add new recommendations
        prediction.recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendations.appendChild(li);
        });
    }
});