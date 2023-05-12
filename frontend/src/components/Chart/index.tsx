import { HexColor } from '@/common/types';
import dynamic from 'next/dynamic';

type ChartProps = {
    data: number[];
    color: HexColor;
};

const Chart = ({ data, color }: ChartProps) => {
    // Charts are not SSR compatible, so we need to use dynamic import
    const TinyArea = dynamic(() => import('@ant-design/plots').then((mod) => mod.TinyArea), { ssr: false });

    const config = {
      autoFit: true,
      data,
      smooth: true,
      areaStyle: {
        fill: `l(90) 0:${color} 0.8:${color} 1:#FFFFFF`
      },
      line: {
        color
      },
      meta: {
        x: {
            range: [0,1]
        }
      }
    };
  
    return (
        <TinyArea {...config} />
    );
}

export default Chart;