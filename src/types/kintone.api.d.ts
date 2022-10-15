import {
  App as DefaultApp,
  Record as DefaultRecord,
  Layout as DefaultLayout,
} from '@kintone/rest-api-client/lib/client/types';
import { OneOf as DefaultFieldProperty } from '@kintone/rest-api-client/lib/KintoneFields/types/property';
import {
  OneOf as DefaultField,
  Creator as DefaultCreator,
  UserSelect as DefaultUserSelect,
} from '@kintone/rest-api-client/lib/KintoneFields/types/field';
import {
  OneOf as DefaultLayoutField,
  Label as DefaultLayoutLabel,
} from '@kintone/rest-api-client/lib/KintoneFields/types/fieldLayout';
import {
  Group as DefaultGroup,
  Row as DefaultRow,
} from '@kintone/rest-api-client/lib/KintoneFields/types/layout';

declare namespace kx {
  type App = DefaultApp;
  type Field = DefaultField;
  type FieldProperty = DefaultFieldProperty;
  type FieldPropertyType = FieldProperty['type'];

  type FieldProperties = Record<string, FieldProperty>;
  type FieldEntry = [string, FieldProperty];

  type RecordData = DefaultRecord;

  type Layout = DefaultLayout;
  type LayoutField = DefaultLayoutField;

  namespace field {
    type Creator = DefaultCreator;
    type UserSelect = DefaultUserSelect;
    type UserEntity = Creator['value'];
  }

  namespace layout {
    type Label = DefaultLayoutLabel;
    type Row = DefaultRow<LayoutField[]>;
    type Group = DefaultGroup<Row[]>;
  }

  namespace response {
    type App = { readonly app?: DefaultApp; readonly fields?: FieldProperties };
  }
}
