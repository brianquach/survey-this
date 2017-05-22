exports.SurveyRestAPI = {};

const noop = () => {};

exports.SurveyRestAPI.getSurveys = (params, callback) => {
  const creator = params.email || '';
  const filter = params.filter || 'all';
  const url = `http://localhost:3000/survey/${creator}/${filter}`;
  callback = callback || noop;

  fetch(url, {
    method: 'GET',
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json',
    }
  })
  .then((resp) => resp.json())
  .then((respJSON) => {
    callback(respJSON.Items);
  })
  .catch((err) => {
    console.error(err);
  });
};

exports.SurveyRestAPI.createSurvey = (params, callback) => {
  const creator = params.email || '';
  const title = params.title || '';
  const questions = params.questions || [];
  const url = 'http://localhost:3000/survey';
  callback = callback || noop;

  fetch(url, {
    method: 'POST',
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({
      Title: title,
      Creator: creator,
      Questions: questions
    })
  })
  .then((resp) => resp.json())
  .then((respJSON) => {
    callback(respJSON.IsSuccessful);
  })
  .catch((err) => {
    console.error(err);
  });
};

exports.SurveyRestAPI.saveSurveyResponse = (params, callback) => {
  const surveyId = params.surveyId || '';
  const surveyResults = params.surveyResults || {};
  const url = 'http://localhost:3000/survey/results';
  callback = callback || noop;

  fetch(url, {
    method: 'POST',
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({
      surveyId: surveyId,
      surveyResults: surveyResults
    })
  })
  .then((resp) => resp.json())
  .then((respJSON) => {
    callback(respJSON.IsSuccessful);
  })
  .catch((err) => {
    console.error(err);
  });
};
