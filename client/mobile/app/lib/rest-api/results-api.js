const noop = () => {};

const saveSurveyResponse = (params, callback) => {
  const creator = params.creator || '';
  const resultSetName = params.resultSetName || '';
  const surveyId = params.surveyId || '';
  const surveyTitle = params.surveyTitle || '';
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
      creator,
      resultSetName,
      surveyId,
      surveyTitle,
      surveyResults
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

const getSurveyResults = (params, callback) => {
  const creator = params.creator || '';
  const url = `http://localhost:3000/results/${creator}`;
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

exports.ResultsAPI = {
  saveSurveyResponse,
  getSurveyResults
};
