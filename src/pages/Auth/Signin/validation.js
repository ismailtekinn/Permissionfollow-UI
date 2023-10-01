import * as yup from 'yup';

const validations = yup.object().shape({
    email: yup.string().email("Email formatında olmalı").required('Bu alan zorunludur'),
    password: yup.string().min(4, "Minimum dört karakter giriniz").required('Bu alan zorunludur')
});

export default validations;