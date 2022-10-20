import React, { memo, useState, FC, FCX } from 'react';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary } from '@mui/material';

import ConditionForm from './condition-form';
import ConditionDeletionButton from '../condition-deletion-button';

type ContainerProps = Readonly<{ index: number }>;
type Props = ContainerProps & {
  expanded: boolean;
  onChange: () => void;
};

const Component: FCX<Props> = ({ className, index, expanded, onChange }) => (
  <Accordion {...{ expanded, onChange, className }} variant='outlined' square>
    <AccordionSummary>設定{index + 1}</AccordionSummary>
    <AccordionDetails>
      <ConditionForm index={index} />
    </AccordionDetails>
    <AccordionActions>
      <ConditionDeletionButton index={index} />
    </AccordionActions>
  </Accordion>
);

const Container: FC<ContainerProps> = ({ index }) => {
  const [expanded, setExpanded] = useState<boolean>(index === 0);

  const onChange = () => setExpanded((_expanded) => !_expanded);

  return <Component {...{ index, expanded, onChange }} />;
};

export default memo(Container);
