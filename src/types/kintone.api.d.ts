import {
  App as DefaultApp,
  Record as DefaultRecord,
} from '@kintone/rest-api-client/lib/client/types';
import { OneOf as DefaultFieldProperty } from '@kintone/rest-api-client/lib/KintoneFields/types/property';
import {
  Creator as DefaultCreator,
  UserSelect as DefaultUserSelect,
} from '@kintone/rest-api-client/lib/KintoneFields/types/field';

declare namespace kx {
  type App = DefaultApp;
  type Field = DefaultFieldProperty;
  type FieldType = Field['type'];

  type FieldProperties = Record<string, Field>;
  type FieldEntry = [string, Field];

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
