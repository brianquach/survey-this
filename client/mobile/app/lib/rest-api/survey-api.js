const noop = () => {};

const getSurveys = (params, callback) => {
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

const createSurvey = (params, callback) => {
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
      title,
      creator,
      questions
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

exports.SurveyAPI = {
  getSurveys: getSurveys,
  createSurvey: createSurvey
};
