import * as yup from "yup";

const validations = yup.object().shape({
  password: yup
    .string()
    .min(4, "Minimum dört karakter giriniz")
    .required("Bu alan zorunludur"),
    passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Şifre ile Uyuşmamaktadır')
    .required("Bu alan zorunludur"),
});
export default validations;