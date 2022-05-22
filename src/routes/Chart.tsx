import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { RoutersProps } from "../Router";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export interface ChartProps {
  coinId: string;
}
function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<ChartProps>();

  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => ({
                x: new Date(price.time_open),
                y: [
                  price.open.toFixed(2),
                  price.high.toFixed(2),
                  price.low.toFixed(2),
                  price.close.toFixed(2),
                ],
              }))!,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
