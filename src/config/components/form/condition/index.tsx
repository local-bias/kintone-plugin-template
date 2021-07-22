import React, { useState, VFC, VFCX } from 'react';
import styled from '@emotion/styled';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary } from '@material-ui/core';

import ConditionForm from './condition-form';
import ConditionDeletionButton from '../condition-deletion-button';

type ContainerProps = Readonly<{ condition: kintone.plugin.Condition; index: number }>;
type Props = ContainerProps & {
  expanded: boolean;
  onChange: () => void;
};

const Component: VFCX<Props> = ({ className, condition, index, expanded, onChange }) => (
  <Accordion {...{ expanded, onChange, className }} variant='outlined' square>
    <AccordionSummary>設定{index + 1}</AccordionSummary>
    <AccordionDetails>
      <ConditionForm {...{ condition, index }} />
    </AccordionDetails>
    <AccordionActions>
      <ConditionDeletionButton {...{ index }} />
    </AccordionActions>
  </Accordion>
);

const StyledComponent = styled(Component)`
  .input {
    min-width: 250px;
  }
`;

const Container: VFC<ContainerProps> = ({ condition, index }) => {
  const [expanded, setExpanded] = useState<boolean>(index === 0);

  const onChange = () => setExpanded((_expanded) => !_expanded);

  return <StyledComponent {...{ condition, index, expanded, onChange }} />;
};

export default Container;
