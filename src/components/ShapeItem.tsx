const ShapeItem = ({ shape, isSelected }) => {
  const commonProps = {
    fill: shape.fill,
    stroke: isSelected ? '#ff4757' : 'none',
    strokeWidth: isSelected ? 3 : 0,
    strokeDasharray: isSelected ? "5,5" : "none" // Przerywana linia dla zaznaczenia
  };

  if (shape.type === 'rect') {
    return <rect x={shape.x} y={shape.y} width={shape.width} height={shape.height} {...commonProps} />;
  }
  if (shape.type === 'circle') {
    const r = shape.width / 2;
    return <circle cx={shape.x + r} cy={shape.y + (shape.height / 2)} r={r} {...commonProps} />;
  }
  return null;
};

export default ShapeItem;