import { TinyArea } from '@ant-design/plots';

type HexColor = `#${string}`;

type ChartProps = {
    data: number[];
    height: number;
    color: HexColor;
};

const Chart = ({ data, height, color }: ChartProps) => {
    const config = {
      height,
      autoFit: false,
      data,
      smooth: true,
      areaStyle: {
        fill: color,
      },
    };
  
    return (
        <TinyArea {...config} />
    );
}

export default Chart;