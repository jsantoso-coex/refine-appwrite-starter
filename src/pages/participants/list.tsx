import { List, useTable, getDefaultSortOrder, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { Space, Table } from "antd";

import type { IParticipant } from "../../interfaces";

export const ParticipantList = () => {
  const { tableProps, sorters } = useTable<IParticipant>({
    initialSorter: [
      {
        field: "name",
        order: "asc",
      },
    ],
  });

  return (
    <List>
      <Table {...tableProps} rowKey="name">
        <Table.Column<IParticipant>
          dataIndex="name"
          title="Name"
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
        />
        <Table.Column<IParticipant> dataIndex="business_number" title="Business Number" sorter />
        <Table.Column<IParticipant>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
