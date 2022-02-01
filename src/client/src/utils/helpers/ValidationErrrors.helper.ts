import * as yup from 'yup';

export const Validators = {
    username: yup.string().required('Поле обязательно для заполнения'),
    email: yup.string().required('Поле обязательно для заполнения'),
    password: yup.string().required('Поле обязательно для заполнения'),
    passwordRepeat: yup
        .string()
        .test(
            'passwordRepeat',
            'Пароли должны совпадать',
            function Validate(value) {
                return this.parent.password === value;
            },
        ),
};
