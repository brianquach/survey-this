exports.SurveyRestAPI = {};

exports.SurveyRestAPI.getSurveys = (params, callback) => {
  const creator = params.email || '';
  const filter = params.filter || 'all';
  const url = `http://localhost:3000/survey/${creator}/${filter}`;
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
