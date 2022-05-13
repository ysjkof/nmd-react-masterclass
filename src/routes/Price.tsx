import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { PriceData } from "./Coin";

const Ul = styled.ul`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 10px 20px;
`;
const Li = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
`;

interface ChartProps {
  coinId: string;
}
function Price() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 5000 }
  );

  return (
    <Ul>
      <Li>
        <span>현재가</span>
        <span>
          $
          {Number(data?.quotes.USD.price.toFixed(3)).toLocaleString("ko-KR", {
            maximumFractionDigits: 4,
          })}
        </span>
      </Li>
      <Li>
        <span>최고가였던 날</span>
        <span>
          {new Date(data?.quotes.USD.ath_date!).toLocaleDateString("ko-KR")}
        </span>
      </Li>
      <Li>
        <span>최고가</span>
        <span>
          $
          {Number(data?.quotes.USD.ath_price.toFixed(3)).toLocaleString(
            "ko-KR",
            {
              maximumFractionDigits: 4,
            }
          )}
        </span>
      </Li>
      <Li>
        <span>최고가 대비 현재가 비율</span>
        <span>{data?.quotes.USD.percent_from_price_ath}%</span>
      </Li>
      <Li>
        <span>거래량</span>
        <span>
          {Number(data?.quotes.USD.market_cap).toLocaleString("ko-KR", {
            maximumFractionDigits: 4,
          })}
        </span>
      </Li>
      <Li>
        <span>변화량(15분)</span>
        <span>{data?.quotes.USD.percent_change_15m}%</span>
      </Li>
      <Li>
        <span>변화량(30분)</span>
        <span>{data?.quotes.USD.percent_change_30m}%</span>
      </Li>
      <Li>
        <span>변화량(1시간)</span>
        <span>{data?.quotes.USD.percent_change_1h}%</span>
      </Li>
      <Li>
        <span>변화량(6시간)</span>
        <span>{data?.quotes.USD.percent_change_6h}%</span>
      </Li>
      <Li>
        <span>변화량(12시간)</span>
        <span>{data?.quotes.USD.percent_change_12h}%</span>
      </Li>
      <Li>
        <span>변화량(24시간)</span>
        <span>{data?.quotes.USD.percent_change_24h}%</span>
      </Li>
      <Li>
        <span>변화량(7일)</span>
        <span>{data?.quotes.USD.percent_change_7d}%</span>
      </Li>
      <Li>
        <span>변화량(30일)</span>
        <span>{data?.quotes.USD.percent_change_30d}%</span>
      </Li>
      <Li>
        <span>변화량(1년)</span>
        <span>{data?.quotes.USD.percent_change_1y}%</span>
      </Li>
      <Li>
        <span>Market Cap Change(24시간)</span>
        <span>{data?.quotes.USD.market_cap_change_24h}</span>
      </Li>
      <Li>
        <span>Volume(24시간)</span>
        <span>
          {Number(data?.quotes.USD.volume_24h.toFixed(3)).toLocaleString(
            "ko-KR",
            {
              maximumFractionDigits: 4,
            }
          )}
        </span>
      </Li>
      <Li>
        <span>Volume 24h Change 24h</span>
        <span>
          {Number(
            data?.quotes.USD.volume_24h_change_24h.toFixed(3)
          ).toLocaleString("ko-KR", {
            maximumFractionDigits: 4,
          })}
        </span>
      </Li>
    </Ul>
  );
}

export default Price;
