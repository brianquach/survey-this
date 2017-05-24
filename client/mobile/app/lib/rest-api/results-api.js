const noop = () => {};

const saveSurveyResponse = (params, callback) => {
  const resultSetName = params.resultSetName || '';
  const surveyId = params.surveyId || '';
  const surveyResults = params.surveyResults || {};
  const url = 'http://localhost:3000/results';
  callback = callback || noop;

  fetch(url, {
    method: 'POST',
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({
      resultSetName: resultSetName,
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

const getSurveyResponse = (params, callback) => {
  const surveyId = params.surveyId || '';
  const url = `http://localhost:3000/results/${surveyId}`;
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
    callback(respJSON);
  })
  .catch((err) => {
    console.error(err);
  });
};

exports.ResultsAPI = {
  saveSurveyResponse: saveSurveyResponse,
  getSurveyResponse: getSurveyResponse
};
