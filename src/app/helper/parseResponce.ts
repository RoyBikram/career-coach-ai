const parseResponse = (inputString: string) => {
  const regex = /\|\|\|([^|]*)\|\|\|/;
  const match = inputString.match(regex);
  console.log(match);

  const parseString = match ? match[1].trim() : null;
  const parseJson = parseString ? JSON.parse(parseString) : null;
  return parseJson;
};
export default parseResponse;
