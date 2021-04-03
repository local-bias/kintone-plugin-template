declare const cybozu: any;

type Schema = {
  groups: any[];
  revision: string;
  subTable: Record<string, Table>;
  table: Table;
};

type PropBase = {
  id: string;
  var: string;
  label: string;
};

type Table = PropBase & {
  fieldList: Record<string, Field>;
  properties: { noLabel: 'true' | 'false' };
  type: 'TABLE';
};

export type Field = PropBase & {
  type: string;
  properties: {
    defaultValue: string;
    expression: string;
    hideExpression: 'true' | 'false';
    isLookup: boolean;
    lookup?: any;
    max: any;
    min: any;
    noLabel: 'true' | 'false';
    required: 'true' | 'false';
    unique: 'true' | 'false';
  };
};

const getSchema = () => (cybozu.data.page.SCHEMA_DATA || cybozu.data.page.FORM_DATA.schema) as Schema;

export const getFields = () => {
  const schema = getSchema();

  return Object.values(schema.table.fieldList);
};

export const getSubtableFields = (subtableCode: string) => {
  const schema = getSchema();

  const subTables = Object.values(schema.subTable);

  for (const subTable of subTables) {
    if (subTable.var === subtableCode) {
      return Object.values(subTable.fieldList);
    }
  }

  return null;
};

export const getFieldMap = () => {
  const fields = getFields();

  return new Map(fields.map((field) => [field.var, field]));
};
