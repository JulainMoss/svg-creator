import React from 'react';
import ShapeItem from './ShapeItem';

const SvgCanvas = ({ shapes, canvasRef, canvasSize }) => {
  return (
    <div style={{ 
        border: '2px solid #333', 
        background: '#fff',
        maxWidth: '100%',     // Nie szerszy niż ekran
        maxHeight: `${canvasSize.height + 20}px`,    // Nie wyższy niż wysokość SVG + trochę marginesu
        // maxHeight: '80vh',    // Nie wyższy niż 80% wysokości okna
        overflow: 'auto',     // Pojawią się paski przewijania, gdy SVG będzie za duże
        display: 'inline-block' // Kontener dopasuje się do krawędzi SVG
        }}>
      <svg 
        ref={canvasRef} // To pozwala nam pobrać zawartość SVG do pliku
        width={canvasSize.width} 
        height={canvasSize.height} 
        viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
        xmlns="http://www.w3.org/2000/svg" // Ważne dla poprawnego odczytu pliku przez inne programy
      >
        {shapes.map((shape) => (
          <ShapeItem key={shape.id} shape={shape} />
        ))}
      </svg>
    </div>
  );
};
export default SvgCanvas;