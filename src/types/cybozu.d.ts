type Cybozu = Record<string, unknown> & {
  data: {
    IS_MOBILE_DEVICE: boolean;
    page: {
      SCHEMA_DATA: Schema;
      FORM_DATA: {
        schema: Schema;
      };
    };
  };
};

type PropBase = {
  id: string;
  var: string;
  label: string;
};

export type Field = PropBase & {
  type: string;
  properties: {
    defaultValue: string;
    expression: string;
    hideExpression: 'true' | 'false';
    isLookup: boolean;
    lookup?: unknown;
    max: unknown;
    min: unknown;
    noLabel: 'true' | 'false';
    required: 'true' | 'false';
    unique: 'true' | 'false';
  };
};

type Table = PropBase & {
  fieldList: Record<string, Field>;
  properties: { noLabel: 'true' | 'false' };
  type: 'TABLE';
};

type Schema = {
  groups: any[];
  revision: string;
  subTable: Record<string, Table>;
  table: Table;
};
