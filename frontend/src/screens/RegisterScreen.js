import { register } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';
import { hideLoading, redirectUser, showLoading, showMessage } from '../utils';

const RegisterScreen = {
    after_render: () => {
        document
            .getElementById('register-form')
            .addEventListener('submit', async (e) => {
                e.preventDefault();
                showLoading();
                const data = await register({
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value,
                });
                hideLoading();
                if (data.error) {
                    // eslint-disable-next-line no-alert
                    showMessage(data.error);
                } else {
                    setUserInfo(data);
                    redirectUser();
                }
            });
    },
    render: () => {
        if (getUserInfo().name) {
            redirectUser();
        }
        return `
        <div class="form-container">
           <form id="register-form">
             <ul class="form-items">
                <li>
                   <h1> Create Account </h1>
                </li>
                <li>
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name"/>
                </li>
                <li>
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email"/>
                </li>
                <li>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password"/>
                </li>
                <li>
                    <label for="repassword">Re-Enter Password</label>
                    <input type="password" id="repassword" name="repassword"/>
                </li>
                <li>
                    <button type="submit" class="primary"> Register </button>
                </li>
                <li>
                    <div>
                        Already have an account ?
                        <a href="#/signin" >Sign In</a>
                    </div>
                </li>
             </ul>
           </form>
        </div>`;
    },
};
export default RegisterScreen;
