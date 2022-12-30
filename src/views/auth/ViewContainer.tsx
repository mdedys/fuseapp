import { Col, Row } from "antd";
import { PropsWithChildren } from "react";

import Flex from "~/components/flex/Flex.js";

export default function ViewContainer(props: PropsWithChildren) {
  return (
    <Row justify="center" style={{ height: "100%" }}>
      <Col xs={20} sm={8}>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="1.5rem"
          style={{ height: "100%" }}
        >
          {props.children}
        </Flex>
      </Col>
    </Row>
  );
}
