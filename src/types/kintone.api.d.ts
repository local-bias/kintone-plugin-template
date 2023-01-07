import {
  App as DefaultApp,
  Record as DefaultRecord,
  Layout as DefaultLayout,
} from '@kintone/rest-api-client/lib/client/types';
import {
  OneOf as DefaultFieldProperty,
  Subtable as PropertySubtable,
  InSubtable as PropertyInSubtable,
} from '@kintone/rest-api-client/lib/KintoneFields/types/property';
import {
  OneOf as DefaultField,
  Creator as DefaultCreator,
  UserSelect as DefaultUserSelect,
  InSubtable as FieldInSubtable,
  Subtable as FieldSubtable,
} from '@kintone/rest-api-client/lib/KintoneFields/types/field';
import { ViewForResponse, ViewForParameter } from '@kintone/rest-api-client/lib/client/types';
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

  namespace view {
    type Response = ViewForResponse;
    type Parameter = ViewForParameter;
  }

  /** JavaScript APIやREST APIから取得できるレコードの各フィールド情報 */
  namespace field {
    type Creator = DefaultCreator;
    type UserSelect = DefaultUserSelect;
    type UserEntity = Creator['value'];
    type InSubtable = FieldInSubtable;
    type Subtable<T extends Record<string, InSubtable> = Record<string, InSubtable>> =
      FieldSubtable<T>;
  }

  /** REST APIから取得できるアプリの各フィールド情報 */
  namespace property {
    type InSubtable = PropertyInSubtable;
    type Subtable<T extends Record<string, InSubtable> = Record<string, InSubtable>> =
      PropertySubtable<T>;
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
