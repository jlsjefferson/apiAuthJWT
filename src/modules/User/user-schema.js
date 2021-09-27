const Yup = require('yup');

const storeValidator = Yup.object().shape({
  username: Yup.string().required('username é obrigatório'),
  password: Yup.string().required('password é obrigatório'),
  email: Yup.string().email("email informado é inválido").required('email é obrigatório'),
  role: Yup.number().max(1, 'Minimo valor 1').integer().required('Número do código é requerido'),
});

const editValidator = Yup.object().shape({
  username: Yup.string().required('username é obrigatório'),
  email: Yup.string().email("email informado é inválido").required('email é obrigatório'),
  role: Yup.number().max(1, 'Minimo valor 1').integer().required('Número do código é requerido'),
});



module.exports = {
  storeValidator,
  editValidator
};
