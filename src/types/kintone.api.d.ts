import {
  App as DefaultApp,
  Record as DefaultRecord,
} from '@kintone/rest-api-client/lib/client/types';
import { OneOf as DefaultFieldProperty } from '@kintone/rest-api-client/lib/KintoneFields/types/property';
import {
  OneOf as DefaultField,
  Creator as DefaultCreator,
  UserSelect as DefaultUserSelect,
} from '@kintone/rest-api-client/lib/KintoneFields/types/field';

declare namespace kx {
  type App = DefaultApp;
  type Field = DefaultField;
  type FieldProperty = DefaultFieldProperty;
  type FieldPropertyType = FieldProperty['type'];

  type FieldProperties = Record<string, FieldProperty>;
  type FieldEntry = [string, FieldProperty];

  type RecordData = DefaultRecord;

  namespace field {
    type Creator = DefaultCreator;
    type UserSelect = DefaultUserSelect;
    type UserEntity = Creator['value'];
  }

  namespace response {
    type App = { readonly app?: DefaultApp; readonly fields?: FieldProperties };
  }
}
