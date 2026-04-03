import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Check, Leaf } from 'lucide-react';

const ImageUpload = ({ value, onChange, label = "Upload Image" }) => {
    const [preview, setPreview] = useState(value || "");
    const [isCapturing, setIsCapturing] = useState(false);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setPreview(base64String);
                onChange(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const startCamera = async () => {
        setIsCapturing(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera access denied", err);
            setIsCapturing(false);
        }
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            const base64String = canvasRef.current.toDataURL('image/jpeg');
            setPreview(base64String);
            onChange(base64String);
            stopCamera();
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
        setIsCapturing(false);
    };

    const removeImage = () => {
        setPreview("");
        onChange("");
    };

    return (
        <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>
            
            <div className="relative group">
                {preview ? (
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-primary-100 shadow-inner">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                            onClick={removeImage}
                            type="button"
                            className="absolute top-3 right-3 p-2 bg-white/90 text-red-500 rounded-xl shadow-lg hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                        >
                            <X size={18} />
                        </button>
                        <div className="absolute bottom-3 right-3 bg-primary-600 text-white p-1.5 rounded-full shadow-lg">
                            <Check size={14} />
                        </div>
                    </div>
                ) : isCapturing ? (
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-black border-2 border-primary-500">
                        <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3">
                            <button 
                                onClick={captureImage}
                                type="button"
                                className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 shadow-xl"
                            >
                                <Check size={24} />
                            </button>
                            <button 
                                onClick={stopCamera}
                                type="button"
                                className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-3">
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            type="button"
                            className="flex-1 h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all"
                        >
                            <Upload size={24} />
                            <span className="text-xs font-bold uppercase tracking-widest">Device File</span>
                        </button>
                        <button 
                            onClick={startCamera}
                            type="button"
                            className="flex-1 h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all"
                        >
                            <Camera size={24} />
                            <span className="text-xs font-bold uppercase tracking-widest">Take Photo</span>
                        </button>
                    </div>
                )}
                
                <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="hidden" 
                />
                <canvas ref={canvasRef} className="hidden" />
            </div>
            
            <p className="text-[10px] text-gray-400 font-medium italic flex items-center gap-1.5 ml-1">
                <Leaf size={10} className="text-primary-400" />
                Upload a real photo to build more trust with your customers.
            </p>
        </div>
    );
};

export default ImageUpload;
