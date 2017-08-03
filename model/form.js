// model/form.js
const AV = require('../utils/av-weapp-min.js');
class Form extends AV.Object {
}
// Register object
AV.Object.register(Form, 'FML');

// Export object
module.exports = Form;