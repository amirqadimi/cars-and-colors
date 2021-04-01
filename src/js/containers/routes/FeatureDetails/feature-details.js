import React from 'react';
import { useParams } from 'react-router-dom';
import Page404 from 'js/components/Page404';
import { MODELS } from 'js/containers/routes/SelectModel';
import { FEATURES } from 'js/containers/routes/Features/select-feature';
import Colors from './features/colors';

const FeatureDetails = () => {

  const { modelId, featureId } = useParams();

  if (!Object.values(MODELS).includes(modelId) || !Object.values(FEATURES).includes(featureId)) {
    return <Page404 />;
  }

  switch (featureId) {
    case FEATURES.colors:
      return <Colors />;
    default:
      return null;
  }
};

export default FeatureDetails;