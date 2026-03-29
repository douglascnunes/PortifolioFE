export function normalizeSvg(svg) {
  return svg
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/on\w+=".*?"/g, '')
    .replace(/fill=".*?"/g, 'fill="currentColor"')
    .replace(/<\?xml.*?\?>/, '')
    .trim();
};