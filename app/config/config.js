export function config() {
  let baseUrl = 'https://murmuring-savannah-3366.herokuapp.com/';
  return {
    issues: baseUrl + 'api/issues',
    resources: baseUrl + 'api/slalom_resources'
  };
}

