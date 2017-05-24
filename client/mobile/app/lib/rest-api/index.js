import { SurveyAPI } from './survey-api';
import { ResultsAPI } from './results-api';


exports.SurveyRestAPI = Object.assign({}, SurveyAPI, ResultsAPI);
