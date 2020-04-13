const ensureThatFieldsHasValue = (data, fields) => {
  for (let i = 0; i < fields.length; i++) {
    let fieldName = fields[i];
    let value = data[fieldName];
    if (value === "" || value === null || value === undefined) {
      return `'${fieldName}' field should contains value`;
    }
  }
  return null;
};
module.exports.ensureThatFieldsHasValue = ensureThatFieldsHasValue;
