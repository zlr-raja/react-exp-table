import "./App.css";
import ExpandableTable from "../ExpandableTable";

function App() {
  const columns = [
    {
      title: "Field",
      columnData: [
        { key: "field", class: "field" },
        { key: "type", class: "type" }
      ]
    },
    {
      title: "Description",
      columnData: [{ key: "description", class: "description" }]
    },
    { title: "Tags", columnData: [{ key: "tags", class: "tags" }] }
  ];

  const rowColor = (rowData: {
    source: string | string[];
  }): string | undefined => {
    if (
      rowData.source?.includes("schema_A") &&
      !rowData.source?.includes("schema_B")
    ) {
      return "rgba(51, 255, 0, 0.15)";
    } else if (
      rowData.source?.includes("schema_B") &&
      !rowData.source?.includes("schema_A")
    ) {
      return "rgba(255, 0, 0, 0.15)";
    }
  };

  const visibleOnInit = (rowData: { source: string | string[] }): boolean => {
    if (
      (rowData.source?.includes("schema_A") &&
        !rowData.source?.includes("schema_B")) ||
      (rowData.source?.includes("schema_B") &&
        !rowData.source?.includes("schema_A"))
    ) {
      return true;
    } else {
      return false;
    }
  };
  const data = [
    {
      field: "item_info",
      fieldPath: "item_info",
      type: "Struct",
      tags: ["Item"],
      source: ["schema_B", "schema_A"],
      child: [
        {
          field: "item_name",
          fieldPath: "item_info.item_name",
          type: "String",
          description: "The name of the item",
          source: ["schema_B", "schema_A"]
        },
        {
          field: "item_description",
          fieldPath: "item_info.item_description",
          type: "String",
          description: "The description of the item",
          source: ["schema_B", "schema_A"]
        }
      ]
    },
    {
      field: "shipment_info",
      fieldPath: "shipment_info",
      type: "Struct",
      source: ["schema_B", "schema_A"],
      child: [
        {
          field: "source",
          fieldPath: "shipment_info.source",
          type: "Struct",
          description: "metadata about the source of shipment",
          source: ["schema_B"],
          child: [
            {
              field: "name",
              fieldPath: "shipment_info.source.name",
              type: "String",
              source: ["schema_B"]
            },
            {
              field: "metadata",
              fieldPath: "shipment_info.source.metadata",
              type: "Struct",
              source: ["schema_B"],
              child: [
                {
                  field: "properties",
                  fieldPath: "shipment_info.source.metadata.properties",
                  type: "String",
                  source: ["schema_B"]
                }
              ]
            }
          ]
        },
        {
          field: "desination",
          fieldPath: "shipment_info.desination",
          type: "Struct",
          description: "metadata about the destination of shipment",
          source: ["schema_B", "schema_A"],
          child: [
            {
              field: "name",
              fieldPath: "shipment_info.desination.name",
              type: "String",
              source: ["schema_B", "schema_A"]
            },
            {
              field: "metadata",
              fieldPath: "shipment_info.desination.metadata",
              type: "Struct",
              source: ["schema_B", "schema_A"],
              child: [
                {
                  field: "properties",
                  fieldPath: "shipment_info.desination.metadata.properties",
                  type: "String",
                  source: ["schema_B", "schema_A"]
                }
              ]
            },
            {
              field: "payment_info",
              fieldPath: "shipment_info.desination.payment_info",
              type: "String",
              tags: ["Payment"],
              source: ["schema_B", "schema_A"],
              child: [
                {
                  field: "price",
                  fieldPath: "shipment_info.desination.payment_info.price",
                  type: "Number",
                  source: ["schema_B", "schema_A"]
                },
                {
                  field: "currency",
                  fieldPath: "shipment_info.desination.payment_info.currency",
                  type: "String",
                  source: ["schema_B", "schema_A"]
                }
              ]
            },
            {
              field: "geo_info",
              fieldPath: "shipment_info.desination.geo_info",
              type: "Struct",
              source: ["schema_A"],
              child: [
                {
                  field: "lat",
                  fieldPath: "shipment_info.desination.geo_info.lat",
                  type: "Number",
                  tags: ["Latitude"],
                  source: ["schema_A"]
                },
                {
                  field: "lng",
                  fieldPath: "shipment_info.desination.geo_info.lng",
                  type: "Number",
                  tags: ["Longitude"],
                  source: ["schema_A"]
                }
              ]
            }
          ]
        }
      ]
    }
  ];
  return (
    <div className="App">
      <h1>react-expandable-rows</h1>

      <ExpandableTable
        columns={columns}
        data={data}
        childDataKey={"child"}
        rowKey={"fieldPath"}
        rowColor={rowColor}
        visibleOnInit={visibleOnInit}
      ></ExpandableTable>
    </div>
  );
}

export default App;