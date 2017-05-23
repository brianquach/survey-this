import { SurveyAPI } from './survey-api.js';
import { ResultsAPI } from './results-api.js';


exports.SurveyRestAPI = Object.assign({}, SurveyAPI, ResultsAPI);
