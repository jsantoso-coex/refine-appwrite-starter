import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

import type { HttpError } from "@refinedev/core";
import type { IParticipant } from "../../interfaces";

export const ParticipantEdit = () => {
  const { formProps, saveButtonProps } = useForm<
    IParticipant,
    HttpError,
    IParticipant
  >({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Business Number"
          name="business_number"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
