// import React from 'react';

const ShapeItem = ({ shape }) => {
  if (shape.type === 'rect') {
    return <rect x={shape.x} y={shape.y} width="100" height="100" fill={shape.fill} />;
  }
  if (shape.type === 'circle') {
    return <circle cx={shape.x + 50} cy={shape.y + 50} r="50" fill={shape.fill} />;
  }
  return null;
};

export default ShapeItem;