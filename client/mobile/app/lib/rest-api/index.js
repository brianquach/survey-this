import { SurveyAPI } from './survey';
import { ResultsAPI } from './results';


exports.SurveyRestAPI = Object.assign({}, SurveyAPI, ResultsAPI);
