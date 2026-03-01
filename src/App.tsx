import React, { useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import SvgCanvas from './components/SvgCanvas';

const App = () => {
  const [shapes, setShapes] = useState([]);
  const [selectedType, setSelectedType] = useState('rect');
  const [color, setColor] = useState('#3498db');
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 600 });
  const [bgImage, setBgImage] = useState('');
  const [previewShape, setPreviewShape] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e) => {
    // Pobieramy pozycję myszy względem elementu SVG
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setPreviewShape({
      id: 'preview',
      type: selectedType,
      startX: x,
      startY: y,
      x,
      y,
      width: 0,
      height: 0,
      fill: color
    });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !previewShape) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    // Obliczamy wymiary (obsługujemy przeciąganie w każdą stronę)
    const newWidth = Math.abs(currentX - previewShape.startX);
    const newHeight = Math.abs(currentY - previewShape.startY);
    const newX = Math.min(currentX, previewShape.startX);
    const newY = Math.min(currentY, previewShape.startY);

    setPreviewShape({
      ...previewShape,
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight
    });
  };

  const handleMouseUp = () => {
    if (!isDrawing || !previewShape) return;

    // Zapisujemy kształt na stałe, jeśli nie jest "kropką"
    if (previewShape.width > 5 || previewShape.height > 5) {
      setShapes([...shapes, { ...previewShape, id: Date.now() }]);
    }
    
    setIsDrawing(false);
    setPreviewShape(null);
  };
  
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
    console.log(svgRef.current);
    if (!svgRef.current) return;

    // Klonujemy węzeł, aby nie modyfikować tego, co widzi użytkownik
    const svgClone = svgRef.current.cloneNode(true);
    
    const bgImageInClone = svgClone.querySelector('image');
    if (bgImageInClone) {
      bgImageInClone.remove();
    }

    // Usuwamy ewentualny podgląd (previewShape), który nie powinien być w pliku
    const preview = svgClone.querySelector('[id="preview"]');
    if (preview) preview.remove();

    console.log(svgClone);

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgClone);

    // Dodajemy nagłówek XML, jeśli go brakuje
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `projekt-${Date.now()}.svg`;
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
      {/* shapes, previewShape, onMouseDown, onMouseMove, onMouseUp, canvasRef, canvasSize, bgImage */}
      <SvgCanvas shapes={shapes} previewShape={previewShape} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} canvasRef={svgRef} canvasSize={canvasSize} bgImage={bgImage}/>
    </div>
  );
};

export default App;