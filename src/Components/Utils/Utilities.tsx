import { Typography } from "antd";
import moment from "moment";
import { NumericFormat } from "react-number-format";
// color.js
const colors = [
  "#FF0000",
  "#FFA500",
  "#FFFF00",
  "#008000",
  "#0000FF",
  "#4B0082",
  "#EE82EE",
];

export const getColor = (name:any) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return colors[Math.abs(hash) % colors.length];
};

export const renderSecondaryText = (text:any) => (
  <Typography.Text type="secondary" strong>
    {text}
  </Typography.Text>
);
export const renderSecondaryTextUnderline = (text:any) => (
  <Typography.Text type="secondary" strong underline>
    {text}
  </Typography.Text>
);
export const renderNote = (text:any) =>
  renderSecondaryText(text || <i>Chưa có ghi chú</i>);

export const formatDate = (date:any) => {
  return moment(date).format("DD-MM-YYYY");
};

export const formatDate2 = (date:any) => {
  return moment(date).format("[Thg] MM DD, YYYY, HH:mm");
};

export const formatCurrency = (value:any) => {
  return (
    <NumericFormat
      value={value}
      displayType={"text"}
      thousandSeparator={true}
      decimalScale={0}
    />
  );
};
export const renderSalary = (text:any) => (
  <NumericFormat
    value={text}
    displayType={"text"}
    thousandSeparator={true}
    suffix="đ"
    renderText={(value:any) => (
      <>
        {/* This return the all of the value except for the last character
        , in this case, is the suffix"đ"
        EX:123,444đ returned 123,444  */}
        {renderSecondaryText(value.slice(0, -1))}
        {/* This return the last charater, which is the suffix (đ).
NOTE: -1 is the last character of the whole value. */}
        {renderSecondaryTextUnderline(value.slice(-1))}
      </>
    )}
  />
);
