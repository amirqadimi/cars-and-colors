import React from 'react';
import { useParams } from 'react-router-dom';
import Page404 from 'js/components/Page404';
import { MODELS } from 'js/containers/routes/SelectModel';
import SelectFeature from './select-feature';

const Features = () => {

  const { modelId } = useParams();

  if (!Object.values(MODELS).includes(modelId)) {
    return <Page404 />;
  }

  return (
    <div className='page'>
      <SelectFeature />
    </div>
  );
};

export default Features;