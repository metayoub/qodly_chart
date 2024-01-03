export const pluginBackgroundColor = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart: any, _args: any, options: any) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || 'transparent';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};
