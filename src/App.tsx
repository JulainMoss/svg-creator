import React, { useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import SvgCanvas from './components/SvgCanvas';

const App = () => {
  const [shapes, setShapes] = useState([]);
  const [selectedType, setSelectedType] = useState('rect');
  const [color, setColor] = useState('#3498db');
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 600 });
  const [bgImage, setBgImage] = useState('');
  
  // Ref do elementu SVG
  const svgRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      
      img.onload = () => {
        // Tutaj mamy dostęp do wymiarów pliku
        console.log(`Szerokość: ${img.width}px, Wysokość: ${img.height}px`);

        // Opcjonalnie: Automatycznie ustaw rozmiar płótna na rozmiar zdjęcia
        setCanvasSize({
          width: img.width,
          height: img.height
        });

        // Ustaw tło (Base64)
        setBgImage(event.target.result);
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const addShape = () => {
    const newShape = {
      id: Date.now(),
      type: selectedType,
      x: Math.random() * 400,
      y: Math.random() * 400,
      fill: color,
    };
    setShapes([...shapes, newShape]);
  };

  const removeShape = (id) => {
    setShapes(shapes.filter(s => s.id !== id));
  };

  const downloadSvg = () => {
    if (!svgRef.current) return;

    // 1. Pobieramy kod XML z elementu SVG
    const svgData = svgRef.current.outerHTML;
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    // 2. Tworzymy tymczasowy link do pobrania
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `moj-projekt-${Date.now()}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div style={{ display: 'flex', padding: '40px', gap: '40px', justifyContent: 'center', backgroundColor: '#20020', minHeight: '100vh' }}>
      <Sidebar 
        selectedType={selectedType} 
        setSelectedType={setSelectedType}
        color={color}
        setColor={setColor}
        addShape={addShape}
        shapes={shapes}
        removeShape={removeShape}
        downloadSvg={downloadSvg}
        canvasSize={canvasSize}
        setCanvasSize={setCanvasSize}
        handleImageUpload={handleImageUpload}
        bgImage={bgImage}
        setBgImage={setBgImage}
      />
      <SvgCanvas shapes={shapes} canvasRef={svgRef} canvasSize={canvasSize} bgImage={bgImage}/>
    </div>
  );
};

export default App;