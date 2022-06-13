import { Button } from "antd";
import "./index.less";

function Test() {
  alert(11);
  console.log(2345);

  return (
    <div className="test">
      Test111
      <Button type="primary">Button</Button>
    </div>
  );
}

export default Test;
