import { TinyArea } from '@ant-design/plots';

type HexColor = `#${string}`;

type ChartProps = {
    data: number[];
    color: HexColor;
};

const Chart = ({ data, color }: ChartProps) => {
    const config = {
      autoFit: true,
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