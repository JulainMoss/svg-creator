import { useRef } from 'react';
import RectSelect from './RectSelect';
import CircleSelect from './CircleSelect';


const Sidebar = ({ 
  selectedType,
  setSelectedType, 
  color, 
  setColor, 
  shapes, 
  removeShape, 
  downloadSvg, 
  canvasSize, 
  setCanvasSize, 
  handleImageUpload, 
  bgImage, 
  setBgImage, 
  updateSelectedShape, 
  selectedShape,
  setSelectedShapeId
  }) => {
  
  const fileInputRef = useRef(null);
  let editWindow;
  if (selectedShape) {
    if (selectedShape.type === 'rect') {
      editWindow = <RectSelect selectedShape={selectedShape} updateSelectedShape={updateSelectedShape} setSelectedShapeId={setSelectedShapeId} />;
    } else if (selectedShape.type === 'circle') {
      editWindow = <CircleSelect selectedShape={selectedShape} updateSelectedShape={updateSelectedShape} setSelectedShapeId={setSelectedShapeId} />;
    }
  }
  // console.log("Sidebar renderuje, selectedShape:", selectedShape);

  return (
    <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '10px', borderRight: '1px solid #eee', paddingRight: '20px' }}>
      <h2>SVG Builder</h2>
      
      <label>Typ:</label>
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="rect">Prostokąt</option>
        <option value="circle">Koło</option>
      </select>

      <label>Kolor:</label>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: '100%' }} />
      <label>Rozmiar płótna:</label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="number"
          value={canvasSize.width}
          onChange={(e) => setCanvasSize({ ...canvasSize, width: parseInt(e.target.value) })}
          // placeholder={canvasSize.width}
          style={{ width: "60px"}}  
        />
        <label>x</label>
        <input 
          type="number"
          value={canvasSize.height}
          onChange={(e) => setCanvasSize({ ...canvasSize, height: parseInt(e.target.value) })}
          // placeholder={canvasSize.height}
          style={{ width: "60px"}}  
        />
      </div>
      <hr />

      {selectedShape && (
        editWindow
      )}

      <h3>Warstwy</h3>
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {shapes.map(s => (
          <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>{s.type}</span>
            <button onClick={() => removeShape(s.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Usuń</button>
          </div>
        ))}
      </div>
      <button 
        onClick={downloadSvg} 
        style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#34495e', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}
      >
        💾 Pobierz plik .SVG
      </button>
      <label>Obraz tła:</label>
      <input 
        type="file"
        ref={fileInputRef}
        accept="image/*" 
        onChange={handleImageUpload} 
        style={{ fontSize: '12px' }}
      />
      {bgImage && (
        <button 
          onClick={() => {
            setBgImage(''); // Czyścimy obrazek z podglądu
            if (fileInputRef.current) {
              fileInputRef.current.value = ''; // Czyścimy nazwę pliku w elemencie HTML
            }
          }}
          style={{ marginTop: '5px', color: 'red', cursor: 'pointer' }}
        >
          Usuń tło
        </button>
      )}
    </div>
  );
};

export default Sidebar;