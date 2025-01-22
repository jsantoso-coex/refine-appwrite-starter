import { List, useTable, getDefaultSortOrder } from "@refinedev/antd";
import { Table } from "antd";

import type { IParticipant } from "../../interfaces";

export const ParticipantList = () => {
  const { tableProps, sorters } = useTable<IParticipant>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column<IParticipant>
          dataIndex="name"
          title="Name"
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
        />
        <Table.Column<IParticipant> dataIndex="business_number" title="Business Number" sorter />
      </Table>
    </List>
  );
};
