import React, { memo, useState, FC, FCX } from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary } from '@mui/material';

import ConditionForm from '../form';
import ConditionDeletionButton from '../condition/condition-deletion-button';
import { useConditionIndex } from '../../../contexts/condition-index-provider';

type Props = {
  index: number;
  expanded: boolean;
  onChange: () => void;
};

const Component: FCX<Props> = ({ className, index, expanded, onChange }) => (
  <Accordion {...{ expanded, onChange, className }} variant='outlined' square>
    <AccordionSummary>設定{index + 1}</AccordionSummary>
    <AccordionDetails>
      <ConditionForm />
    </AccordionDetails>
    <AccordionActions>
      <ConditionDeletionButton />
    </AccordionActions>
  </Accordion>
);

const Container: FC = () => {
  const index = useConditionIndex();
  const [expanded, setExpanded] = useState<boolean>(index === 0);

  const onChange = () => setExpanded((_expanded) => !_expanded);

  return <Component {...{ index, expanded, onChange }} />;
};

export default memo(Container);
