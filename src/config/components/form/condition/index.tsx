import React, { useState, VFC, VFCX } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary } from '@material-ui/core';

import { storageState } from '../../../states';
import ConditionForm from './condition-form';
import ConditionDeletionButton from '../condition-deletion-button';

type ContainerProps = Readonly<{ condition: kintone.plugin.Condition; index: number }>;
type Props = ContainerProps & {
  expanded: number | false;
  onChange: (index: number) => (_: any, isExpanded: boolean) => void;
};

const Component: VFCX<Props> = ({ className, condition, index, expanded, onChange }) => (
  <Accordion {...{ className }} expanded={expanded === index} onChange={onChange(index)}>
    <AccordionSummary>設定</AccordionSummary>
    <AccordionDetails>
      <ConditionForm {...{ condition, index }} />
    </AccordionDetails>
    <AccordionActions>
      <ConditionDeletionButton {...{ index }} />
    </AccordionActions>
  </Accordion>
);

const StyledComponent = styled(Component)`
  box-shadow: none !important;
  border: 1px solid #0243;
  margin-bottom: -1px;

  .input {
    min-width: 250px;
  }
`;

const Container: VFC<ContainerProps> = ({ condition, index }) => {
  const [expanded, setExpanded] = useState<number | false>(0);

  const onChange = (index: number) => (_: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? index : false);
  };

  return <StyledComponent {...{ condition, index, expanded, onChange }} />;
};

export default Container;
