const ShapeItem = ({ shape }) => {
  if (shape.type === 'rect') {
    return (
      <rect 
        x={shape.x} y={shape.y} 
        width={shape.width} height={shape.height} 
        fill={shape.fill} 
      />
    );
  }
  if (shape.type === 'circle') {
    // Promień to połowa szerokości, środek to x + r
    const r = shape.width / 2;
    return (
      <circle 
        cx={shape.x + r} cy={shape.y + (shape.height / 2)} 
        r={r} 
        fill={shape.fill} 
      />
    );
  }
  return null;
};

export default ShapeItem;