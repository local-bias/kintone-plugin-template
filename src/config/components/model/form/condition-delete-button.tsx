import { PluginConditionDeleteButton } from '@konomi-app/kintone-utilities-react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useSnackbar } from 'notistack';
import React, { FC } from 'react';
import {
  conditionsAtom,
  conditionsLengthAtom,
  selectedConditionIdAtom,
} from '../../../states/plugin';

const Component: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedConditionId, setSelectedConditionId] = useAtom(selectedConditionIdAtom);
  const setConditions = useSetAtom(conditionsAtom);

  const onClick = async () => {
    setConditions((prev) => prev.filter((condition) => condition.id !== selectedConditionId));
    setSelectedConditionId(null);
    enqueueSnackbar('設定を削除しました', { variant: 'success' });
  };

  return <PluginConditionDeleteButton {...{ onClick }} />;
};

const Container: FC = () => {
  const conditionsLength = useAtomValue(conditionsLengthAtom);

  if (conditionsLength < 2) {
    return null;
  }
  return <Component />;
};

export default Container;
