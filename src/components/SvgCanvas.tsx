import React from 'react';
import ShapeItem from './ShapeItem';

const SvgCanvas = ({ shapes, previewShape, onMouseDown, onMouseMove, onMouseUp, canvasRef, canvasSize, bgImage, selectedShapeId, setSelectedShapeId }) => {
  return (
    <div style={{ 
        border: '2px solid #333', 
        background: '#fff',
        maxWidth: '100%',     // Nie szerszy niż ekran
        maxHeight: `${canvasSize.height}px`,    // Nie wyższy niż wysokość SVG + trochę marginesu
        // maxHeight: '80vh',    // Nie wyższy niż 80% wysokości okna
        overflow: 'auto',     // Pojawią się paski przewijania, gdy SVG będzie za duże
        display: 'inline-block' // Kontener dopasuje się do krawędzi SVG
        }}>
      <svg 
        ref={canvasRef}
        width={canvasSize.width} 
        height={canvasSize.height} 
        viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        
        {bgImage && <image href={bgImage} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />}
        
        {/* Renderowanie zapisanych kształtów */}
        {shapes.map((shape) => (
            <g 
                key={shape.id} 
                onClick={(e) => {
                e.stopPropagation(); // Zapobiega rozpoczęciu rysowania nowego kształtu
                setSelectedShapeId(shape.id);
                }}
                style={{ cursor: 'pointer' }}
            >
                <ShapeItem 
                shape={shape} 
                isHovered={selectedShapeId === shape.id} // Opcjonalna ramka zaznaczenia
                />
            </g>
        ))}

        {/* Renderowanie podglądu w trakcie rysowania */}
        {previewShape && (
          <ShapeItem shape={{ ...previewShape, fill: previewShape.fill + '80' }} /> // '80' dodaje przezroczystość
        )}
      </svg>
    </div>
  );
};
export default SvgCanvas;