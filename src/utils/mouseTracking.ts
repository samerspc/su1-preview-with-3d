
// Mouse position interface
export interface MousePosition {
  x: number;
  y: number;
}

// Calculate normalized mouse position (-1 to 1)
export const calculateNormalizedPosition = (
  mouseX: number, 
  mouseY: number, 
  elementRect: DOMRect
): MousePosition => {
  // Calculate position relative to the element center
  const centerX = elementRect.left + elementRect.width / 2;
  const centerY = elementRect.top + elementRect.height / 2;
  
  // Normalize to -1 to 1 range
  const normalizedX = (mouseX - centerX) / (elementRect.width / 2);
  const normalizedY = (mouseY - centerY) / (elementRect.height / 2);
  
  // Limit values to -1 to 1 range
  return {
    x: Math.max(-1, Math.min(1, normalizedX)),
    y: Math.max(-1, Math.min(1, normalizedY)),
  };
};

// Calculate rotation amounts based on mouse position
export const calculateRotation = (
  normalizedPosition: MousePosition,
  sensitivity: number = 0.1
): MousePosition => {
  return {
    x: -normalizedPosition.y * sensitivity, // Invert Y for natural rotation
    y: normalizedPosition.x * sensitivity,
  };
};
