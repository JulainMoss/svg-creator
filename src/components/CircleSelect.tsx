export default function CircleSelect({ selectedShape, updateSelectedShape, setSelectedShapeId }) {
    return (
        <div style={{ marginTop: '20px', padding: '15px', background: '#006001', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px'  }}>
            <h4>Edytuj Koło</h4>
            
            <label>Kolor:</label>
            <input 
                type="color" 
                value={selectedShape.fill} 
                onChange={(e) => updateSelectedShape({fill: e.target.value})} 
            />

            <label>Pozycja X:</label>
            <input 
                type="number" 
                value={selectedShape.x} 
                onChange={(e) => updateSelectedShape({x: parseInt(e.target.value)})} 
            />
            <label>Pozycja Y:</label>
            <input 
                type="number" min="0" max="800" 
                value={selectedShape.y} 
                onChange={(e) => updateSelectedShape({y: parseInt(e.target.value)})} 
            />

            <label>Szerokość:</label>
            <input 
                type="number" min="5" max="500" 
                value={selectedShape.width} 
                onChange={(e) => updateSelectedShape({width: parseInt(e.target.value)})} 
            />
            <label>Wysokość:</label>
            <input 
                type="number" min="5" max="500" 
                value={selectedShape.height} 
                onChange={(e) => updateSelectedShape({height: parseInt(e.target.value)})} 
            />

            <button 
                onClick={() => setSelectedShapeId(null)}
                style={{ marginTop: '10px', width: '100%' }}
            >
                Gotowe / Odznacz
            </button>
            </div>
    );
}
