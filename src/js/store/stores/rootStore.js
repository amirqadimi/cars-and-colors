import { makeObservable, observable, action } from 'mobx';

/* eslint-disable lines-between-class-members */
class RootStore {
	color = '';
	feature = '';
	view = '';
	loading_status = {};
	current_loading = 0;
	current_sequence = '';
	is_full_loading_up = true;

	constructor() {
   makeObservable(this, {
      color: observable,
      feature: observable,
      view: observable,
      loading_status: observable,
      current_sequence: observable,
      current_loading: observable,
      is_full_loading_up: observable,
      setfeature: action,
      setColor: action,
      resetFeatures: action,
      setIsLoading: action,
      setCurrentSequnce: action,
      setCurrentLoading: action,
      setIsFullLoadingUp: action,
    });
	}
     
	setfeature = (selected_feature) => {
    this.feature = selected_feature;
	}

	setColor = (selected_color) => {
    this.color = selected_color;
	}

	resetFeatures = () => {
    this.view = null;
    this.color = null;
	}

	setIsLoading = (sequence, percentage) => {
    this.loading_status[sequence] = percentage;
	}

	setCurrentSequnce = (sequence) => {
    this.current_sequence = sequence;
	}

	setCurrentLoading = (sequence) => {
    this.current_loading = sequence;
	}

	setIsFullLoadingUp = (is_up) => {
    this.is_full_loading_up = is_up;
	}
}

export default RootStore;